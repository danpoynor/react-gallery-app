import {
  render,
  screen
} from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('should render the component', () => {
    render(<Header />);
    const component = screen.getByRole('banner');
    expect(component).toBeInTheDocument();
  });

  it('should render headline', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', {
      name: /Search the Flick r \.com API/i
    });
    expect(heading).toBeInTheDocument();
  });
});
