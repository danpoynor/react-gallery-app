import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  BrowserRouter
} from 'react-router-dom';
import ColorNav from './ColorNav';
import { defaultColors } from '../../settings';

const MockNav = () => (
  <BrowserRouter>
    <ColorNav />
  </BrowserRouter>
);

describe('ColorNav', () => {
  it('should render the component', () => {
    render(<MockNav />);
    const component = screen.getByRole('navigation');
    expect(component).toBeInTheDocument();
  });

  it('should have class .color-nav', () => {
    render(<MockNav />);
    const mainNav = screen.getByRole('navigation');
    expect(mainNav.getAttribute('class')).toEqual('color-nav');
  });

  it('should contain a list', () => {
    render(<MockNav />);
    const nav = screen.getByRole('navigation');
    const list = screen.getByRole('list');
    expect(nav).toContainElement(list);
  });

  it('should contain links', () => {
    render(<MockNav />);
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(3);
  });

  it(`should have first nav href of /tag/${defaultColors[0]}`, () => {
    render(<MockNav />);
    const navLinks = screen.getAllByRole('link');
    expect(navLinks[0].getAttribute('href')).toBe(`/color/${defaultColors[0]}`);
  });

  it(`should have last nav href of /tag/${defaultColors[defaultColors.length - 1]}`, () => {
    render(<MockNav />);
    const navLinks = screen.getAllByRole('link');
    expect(navLinks[navLinks.length - 1].getAttribute('href')).toBe(`/color/${defaultColors[defaultColors.length - 1]}`);
  });
});
