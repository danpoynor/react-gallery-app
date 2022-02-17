import { render, screen } from '@testing-library/react';
import Photo from './Photo';

describe('Photo', () => {
  let photo;
  let imgSize;

  beforeEach(() => {
    photo = {
      id: 'id',
      title: 'title',
      farm: 123,
      server: '456',
      secret: '789'
    };
    imgSize = 'n';
  });

  it('should render the component', () => {
    render(
      <Photo
        photo={photo}
      />
    );
    const component = screen.getByRole('img');
    expect(component).toBeInTheDocument();
  });

  it('test props are consumed correctly', () => {
    render(
      <Photo
        photo={photo}
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${imgSize}.jpg`);
  });
});
