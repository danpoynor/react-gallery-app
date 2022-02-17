/* eslint-disable testing-library/no-unnecessary-act */
import {
  act,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PhotoContainer from './PhotoContainer';

const searchText = 'cars';

const MockPhotosContainer = () => (
  <BrowserRouter>
    <PhotoContainer
      phrase={searchText}
    />
  </BrowserRouter>
);

describe('PhotoContainer', () => {
  xit('should show "Browser not connected to network" message when there is no network', async () => {
    act(() => {
      render(
        <MockPhotosContainer phrase={searchText} />
      );
    });

    // Simulate no network connection
    // without making a copy you will have a circular dependency problem during mocking
    const originalWindow = { ...window };
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      navigator: {
        ...originalWindow.navigator,
        onLine: false
      }
    }));
    await expect(window.navigator.onLine).toBe(false);

    await waitFor(async () => {
      expect(await screen.findByText(/Browser not connected to network/i)).toBeInTheDocument();
    });

    // cleanup
    windowSpy.mockRestore();
  });

  it.todo('should show "Browser not connected to network" message when there is no network');
  it.todo('should show "Invalid API Key (Key has invalid format" when API key format is invalid');
  it.todo('should show "Invalid API Key (Key not found)" message when wrong API key is provided');
  it.todo('should save results to sessionStorage');
  it.todo('should use results saved to sessionStorage if available');
});
