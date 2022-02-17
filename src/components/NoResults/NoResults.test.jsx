import { render, screen } from '@testing-library/react';
import NoResults from './NoResults';

describe('NoResults', () => {
  it('should render the component', () => {
    render(
      <NoResults />
    );
    const component = screen.getByText(/No Results Found/i);
    expect(component).toBeInTheDocument();
  });
});
