import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  it('should render the component', () => {
    render(
      <Loading />
    );
    const component = screen.getByText(/Loading data\.\.\./i);
    expect(component).toBeInTheDocument();
  });
});
