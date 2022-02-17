import { unmountComponentAtNode } from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import {
  act,
  cleanup, // https://testing-library.com/docs/react-testing-library/api/#cleanup
  render,
  screen,
  waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom';
import mockAxios from 'axios';
import App from './App';

// NOTE: `cleanup` is called after each test automatically by default/
// This unmounts React trees that were previously mounted with render
// to help prevent "leaky" tests which can lead to difficult to debug
// errors in your tests
// https://testing-library.com/docs/react-testing-library/api#cleanup

const MockApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

jest.mock('axios');

// Setup/Teardown to prevent "leaky" tests
// https://reactjs.org/docs/test-utils.html
// https://reactjs.org/docs/testing-recipes.html#setup--teardown
let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  document.body.removeChild(container);
  container = null;
  jest.clearAllMocks();
  cleanup();
});

describe('App', () => {
  it('should render without crashing', () => {
    render(<MockApp />);
    const header = screen.getByRole('banner');
    const headings = screen.getAllByRole('heading');
    const search = screen.getByRole('searchbox');
    const button = screen.getByRole('button');
    const navs = screen.getAllByRole('navigation');
    // const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');
    expect(header).toBeInTheDocument();
    expect(headings).toHaveLength(2);
    expect(search).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(navs).toHaveLength(2);
    // expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('should contain headline', async () => {
    render(<MockApp />);
    const headlineText = await screen.findByText(/Search the Flick/i);
    expect(headlineText).toBeInTheDocument();
  });

  it('should show "Welcome!" message from index route on load', async () => {
    render(<MockApp />);
    const component = screen.getByText(/Welcome!/i);
    expect(component).toBeInTheDocument();
  });
});

describe('Routes: Tag Nav Links', () => {
  it('should render the tag nav element', () => {
    render(<MockApp />);
    const tagNav = screen.getAllByRole('navigation')[0];
    expect(tagNav).toHaveAttribute('class', 'main-nav');
  });

  it('should contain at least 3 links', () => {
    render(<MockApp />);
    const tagNav = screen.getAllByRole('navigation')[0];
    const links = tagNav.querySelectorAll('a');
    const tagNavLinkCount = links.length;
    expect(tagNavLinkCount).toBeGreaterThanOrEqual(3);
  });

  describe('Fat Cats link:', () => {
    it('should have href /tag/fat+cats', () => {
      render(<MockApp />);
      const catsLink = screen.getByRole('link', { name: 'Fat Cats' });
      expect(catsLink).toHaveAttribute('href', '/tag/fat+cats');
    });

    describe('when clicked', () => {
      // TODO: Axios mock needs work so it doesn't actually make a request
      it('should request data 1 time using Axios', async () => {
        const user = userEvent.setup();
        mockAxios.get = jest.fn('/').mockResolvedValueOnce('foobar');
        render(<MockApp />, container);
        const catsLink = screen.getByRole('link', { name: 'Fat Cats' });

        await act(async () => {
          await user.click(catsLink);
        });
        await waitFor(() => {
          expect(mockAxios.get).toHaveBeenCalledTimes(1);
        });
      });

      it('should request data with params.tags "fat cats"', async () => {
        const user = userEvent.setup();
        mockAxios.get = jest.fn('/').mockResolvedValue('default');
        render(<MockApp />);
        const catsLink = screen.getByRole('link', { name: 'Fat Cats' });

        await act(async () => {
          await user.click(catsLink);
        });
        await waitFor(() => {
          expect(screen.getByText(/flickr\.com results for/i)).toBeInTheDocument();
        });

        // Note the call uses settings from App.js
        // 0: apiUrl,
        // 1: { params{} } - includes 'tags' search phrase
        expect(mockAxios.get.mock.calls[0][1].params.tags).toBe('fat cats');
      });

      it('should include "Flickr.com results for fats cats" headline', async () => {
        const user = userEvent.setup();
        mockAxios.get = jest.fn('/').mockResolvedValueOnce('foobar');
        render(<MockApp />);
        const catsLink = screen.getByRole('link', { name: 'Fat Cats' });

        await act(async () => {
          await user.click(catsLink);
        });
        await waitFor(() => {
          const title = screen.getByText(/flickr\.com results for/i);
          expect(title).toContainHTML('fat cats');
        });
      });

      it('should update browser tab title', async () => {
        const user = userEvent.setup();
        mockAxios.get = jest.fn('/').mockResolvedValueOnce('foobar');
        render(<MockApp />);
        const catsLink = screen.getByRole('link', { name: 'Fat Cats' });

        await act(async () => {
          await user.click(catsLink);
        });
        await waitFor(() => {
          expect(document.title).toBe('Flickr.com results for "fat cats"');
        });
      });
    });
  });

  xit('should lead to correct route after clicking in unordered manner', async () => {
    const user = userEvent.setup();
    mockAxios.get = jest.fn('/').mockResolvedValueOnce('foobar');
    render(<MockApp />);
    const navLinks = screen.getAllByRole('link');

    await act(async () => {
      await user.click(navLinks[0]); // cats
      await user.click(navLinks[2]); // birds
      await user.click(navLinks[1]); // dogs
    });
    expect(window.location.pathname).toBe('/tag/mean+dogs');
  });

  xit('should lead to correct route after clicking in unordered manner, then the back button', async () => {
    const user = userEvent.setup();
    const history = createMemoryHistory();
    mockAxios.get = jest.fn('/').mockResolvedValueOnce('foobar');

    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    );

    const navLinks = screen.getAllByRole('link');

    await act(async () => {
      await user.click(navLinks[2]); // birds
      await user.click(navLinks[0]); // cats
      await user.click(navLinks[1]); // dogs
      await history.goBack(); // not working
    });

    const title = await screen.findByText(/Flickr\.com results for "fat cats"/i);
    expect(title).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });
});

describe('Routes: Search', () => {
  xit('should redirect to /search/:query search form', () => {
    render(<MockApp />);
    // Set the initial start url to /
    window.history.pushState({}, '', '/');
    window.location.pathname = '/';

    const searchForm = screen.getByPlaceholderText(/Search Flickr\.\.\./i);
    searchForm.value = 'donuts';
    // fireEvent.submit(searchForm);

    // searchForm.dispatchEvent(new Event('submit', { bubbles: true }));
    // Delay to allow for the redirect
    // expect(window.location.pathname).toBe("/search/donuts");
    expect(window.location.assign).toHaveBeenCalledTimes(1);
    // expect(window.location.assign).toHaveBeenCalledWith('/search/donuts',)
  });

  xit('should have search form call window.location.pathname 1 time', () => {
    render(<MockApp />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    userEvent.change(searchInput, { target: { value: 'cats' } });
    userEvent.submit(searchInput);
    // expect(window.location.assign).toHaveBeenCalledTimes(1);
    // expect(getPageUrl()).toBe('/search/cats');
  });

  it.todo('should call axiosMock.get 1 time');
});

describe('Redirects', () => {
  xit('should redirect to / when `/tags/not-a-predefined-tag` is accessed', async () => {
    const history = createMemoryHistory();
    history.push('/tags');
    render(<App />, {
      history
    });
    expect(window.location.pathname).toBe('/');
  });

  xit('should redirect to `/` when `/search/` (without :searchTerm) is accessed directly', async () => {
    const history = createMemoryHistory();
    history.push('/search');
    render(<App />, {
      history
    });
    expect(window.location.pathname).toBe('/');
  });

  xit('should show 404 message if page not found', async () => {
    render(<MockApp />);
    // const errorMessage = await screen.queryByText(/Page Not Found/i);
    // expect(errorMessage).toBeInTheDocument();
    // or perhaps just...
    // const { getByText } = render(<App />);
    // expect(getByText(/Page Not Found/i)).toBeInTheDocument();
  });

  it.todo('should update browser tab title correctly after redirects');
});

// TODO: Test navigation routes
// REF: https://testing-library.com/docs/example-react-router
describe('navigates to the new page', () => {
  xit('landing on a bad page', () => {
    const history = createMemoryHistory();
    history.push('/some/bad/route');
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
