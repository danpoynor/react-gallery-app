import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('should render the component', () => {
    render(<Footer />);
    const component = screen.getByRole('contentinfo');
    expect(component).toBeInTheDocument();
  });

  it('should render disclaimer', () => {
    render(<Footer />);
    const component = screen.getByText(/All images are copyright to their respective owners/i);
    expect(component).toBeInTheDocument();
  });
});
