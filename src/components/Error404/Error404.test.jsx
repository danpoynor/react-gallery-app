import { render, screen } from '@testing-library/react';
import Error404 from './Error404';

describe('Error404', () => {
  it('should render the component', () => {
    render(<Error404 />);
    const component = screen.getByText(/Page Not Found/i);
    expect(component).toBeInTheDocument();
  });
});
