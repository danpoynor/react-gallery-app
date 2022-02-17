import {
  act,
  logDOM,
  render,
  screen
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import { searchPlaceholder } from '../../settings';

const query = '';
const handleSubmit = jest.fn(query);

const MockSearch = () => (
  <BrowserRouter>
    <Search />
  </BrowserRouter>
);

describe('SearchForm', () => {
  it('should render the component', () => {
    render(
      <MockSearch />
    );
    const component = screen.getByRole('searchbox');
    expect(component).toBeInTheDocument();
  });

  it('should render the <form> with class .search', () => {
    render(
      <MockSearch />
    );
    const searchForm = document.forms[0];
    expect(searchForm).toHaveClass('search');
  });

  it('should initially render an empty search input', () => {
    render(
      <MockSearch />
    );
    const searchInput = screen.getByPlaceholderText(searchPlaceholder);
    expect(searchInput).toHaveValue('');
  });

  it('should render search button', () => {
    render(
      <MockSearch />
    );
    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
  });

  it('search button is type "submit"', () => {
    render(
      <MockSearch />
    );
    const searchButton = screen.getByRole('button');
    expect(searchButton).toHaveAttribute('type', 'submit');
  });

  it('should render search field placeholder text', () => {
    render(
      <MockSearch
        searchPlaceholder={searchPlaceholder}
      />
    );
    const searchInput = screen.getByPlaceholderText(searchPlaceholder);
    expect(searchInput).toBeInTheDocument();
  });

  it('should be able to type in input', async () => {
    const inputText = 'donuts';
    render(
      <MockSearch />
    );
    const searchInput = screen.getByRole('searchbox');
    await userEvent.type(searchInput, inputText);
    expect(searchInput.value).toBe(inputText);
  });

  it('should have required attribute on search input', () => {
    render(
      <MockSearch />
    );
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toHaveAttribute('required');
  });

  it('should have button with type="submit"', () => {
    render(
      <MockSearch />
    );
    const searchButton = screen.getByRole('button');
    expect(searchButton).toHaveAttribute('type', 'submit');
  });

  // Should call handleChange function when input changes
  xit('should call handleChange function when input changes', () => {
    render(
      <MockSearch />
    );
    const searchInput = screen.getByRole('searchbox');
    const handleChange = jest.fn();
    searchInput.addEventListener('change', handleChange);
    userEvent.type(searchInput, 'donuts');
    expect(handleChange).toHaveBeenCalled();
  });

  // Should call handleSubmit function when button is clicked
  xit('should call handleSubmit when button clicked', async () => {
    const user = userEvent.setup();
    render(
      <MockSearch />
    );

    await act(async () => {
      await user.click(screen.getByRole('button'));
    });
    logDOM();
    expect(handleSubmit).toHaveBeenCalled();
  });

  it.todo('should not include plus signs (+) in search query');
});
