import {
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  apiArgs,
  apiUrl
} from '../../settings';
import Loading from '../Loading/Loading';
import PhotoList from '../PhotoList/PhotoList';
import './PhotoContainer.css';

const PhotoContainer = ({ phrase }) => {
  const [photosData, setPhotosData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace any plus signs with spaces
  const humanizedPhrase = phrase.trim().replace(/\+/g, ' ');

  useEffect(() => {
    setIsLoading(true);

    const getPhotoData = async (q) => {
      if (!q) return {};

      // Test if browser connected to a network.
      // Still might not be connected to internet though.
      // Ultimately should try to fetch a 1px.gif
      // over the internet and evaluate status code.
      if (!navigator.onLine) {
        setError('Browser not connected to network.');
        setIsLoading(false);
        return {};
      }

      return axios.get(apiUrl, {
        params: {
          ...apiArgs,
          tags: q
        }
      })
        .then((resp) => {
          // Test Flickr API responded, but with an error.
          // Example 'fail' messages might be:
          // - "Invalid API Key (Key has invalid format)"
          // - "Invalid API Key (Key not found)"
          if (!/ok/i.test(resp.data.stat)) {
            setError(resp.data.message);
          } else if (resp.status === 200) {
            return resp;
          }
          return {};
        })
        .catch((err) => {
          // If endpoint is down, or API url is incorrect.
          setError(`${err.message}: Check the API endpoint.`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    const handleResponse = (results) => {
      setPhotosData(results.data.photos.photo);

      if (results.data.photos.photo.length > 0) {
        // Save query results in sessionStorage to speed up subsequent queries
        sessionStorage.setItem(humanizedPhrase, JSON.stringify(results.data.photos.photo));
      }
    };

    // Photo data might come from sessionStorage or the Flickr API
    // Here I avoid making another API call if query results are already in sessionStorage
    const getPhotos = async () => {
      if (sessionStorage.getItem(humanizedPhrase) !== null) {
        // Might need to update sessionStorage data with correct number of photos
        // in case App settings per_page was updated, which I sometimes do.
        // TODO: In case browser left open, set expiration for sessionStorage.
        const storedData = sessionStorage.getItem(humanizedPhrase);
        const storedDataLength = JSON.parse(storedData).length;
        if (storedDataLength === apiArgs.per_page) {
          setPhotosData(JSON.parse(storedData));
        } else {
          const results = await getPhotoData(humanizedPhrase);
          setPhotosData(results.data.photos.photo);
          // Save query result in sessionStorage to speed up subsequent queries
          sessionStorage.setItem(humanizedPhrase, JSON.stringify(results.data.photos.photo));
        }
      } else {
        // Get data from API
        const results = await getPhotoData(humanizedPhrase);
        if (results) {
          handleResponse(results);
        }
      }
    };

    getPhotos().then(() => {
      setIsLoading(false);
    });
  }, [humanizedPhrase, phrase]);

  if (isLoading) return <Loading />;
  if (error) {
    return (
      <>
        <h2 className="error-message">Error loading data</h2>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );
  }

  return <PhotoList photosData={photosData} />;
};

PhotoContainer.propTypes = {
  phrase: PropTypes.string.isRequired
};

export default PhotoContainer;
