import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  BrowserRouter
} from 'react-router-dom';
import Nav from './Nav';
import { defaultTags } from '../../settings';

const MockNav = () => (
  <BrowserRouter>
    <Nav />
  </BrowserRouter>
);

describe('Nav', () => {
  it('should render the component', () => {
    render(<MockNav />);
    const component = screen.getByRole('navigation');
    expect(component).toBeInTheDocument();
  });

  it('should have class .main-nav', () => {
    render(<MockNav />);
    const mainNav = screen.getByRole('navigation');
    expect(mainNav.getAttribute('class')).toEqual('main-nav');
  });

  it('should contain a list', () => {
    render(<MockNav />);
    const nav = screen.getByRole('navigation');
    const list = screen.getByRole('list');
    expect(nav).toContainElement(list);
  });

  it('should contain at least 3 <a> links ', () => {
    render(<MockNav />);
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(3);
  });

  it('should have href', () => {
    render(<MockNav />);
    const navLinks = screen.getAllByRole('link');
    for (let i = 0; i < navLinks.length; i += 1) {
      expect(navLinks[i].getAttribute('href')).toBeTruthy();
    }
  });

  it(`should have first nav href of /tag/${defaultTags[0]}`, () => {
    render(<MockNav />);
    const navLinks = screen.getAllByRole('link');
    const firstUrlTag = defaultTags[0].trim().replace(/\s/g, '+');
    expect(navLinks[0].getAttribute('href')).toBe(`/tag/${firstUrlTag}`);
  });

  it(`should have last nav href of /tag/${defaultTags[defaultTags.length - 1]}`, () => {
    render(<MockNav />);
    const navLinks = screen.getAllByRole('link');
    const lastUrlTag = defaultTags[defaultTags.length - 1].trim().replace(/\s/g, '+');
    expect(navLinks[navLinks.length - 1].getAttribute('href')).toBe(`/tag/${lastUrlTag}`);
  });
});
