// Static settings

export const apiKey = process.env.REACT_APP_FLICKR_API_KEY;

export const apiUrl = 'https://api.flickr.com/services/rest/';

export const apiArgs = {
  api_key: process.env.apiKey || apiKey,
  format: 'json',
  media: 'photos',
  method: 'flickr.photos.search',
  nojsoncallback: 1,
  per_page: 24
};

export const imgSize = 'n';

export const searchPlaceholder = 'Search Flickr...';

export const defaultTags = [
  'fat cats',
  'mean dogs',
  'big birds'
];

export const defaultColors = [
  'yellow',
  'orange',
  'red',
  'magenta',
  'purple',
  'blue',
  'green',
  'black',
  'white'
];
