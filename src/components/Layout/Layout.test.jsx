import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

const MockLayout = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

describe('Layout', () => {
  it('should render the component', () => {
    render(<MockLayout />);

    const component = screen.getByTestId('app-wrapper');
    expect(component).toBeInTheDocument();
  });

  it('should have class "App"', () => {
    render(<MockLayout />);

    const component = screen.getByTestId('app-wrapper');
    expect(component.getAttribute('class')).toEqual('App');
  });
});
