import {
  render,
  screen
} from '@testing-library/react';
import Title from './Title';

describe('Title', () => {
  const phrase = 'search phrase';

  it('should render a headline when given a search phrase', () => {
    render(
      <Title phrase={phrase} />
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render the search phrase in the headline text', () => {
    render(
      <Title phrase={phrase} />
    );
    expect(screen.getByRole('heading')).toHaveTextContent(phrase);
  });

  it('should highlight the search query string element', () => {
    render(
      <Title phrase={phrase} />
    );
    expect(screen.getByTestId('highlight')).toBeInTheDocument();
  });

  it('should not render a headline when an empty search query string is passed in', () => {
    render(
      <Title phrase="" />
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it.todo('should not include plus signs (+) in title');
});
