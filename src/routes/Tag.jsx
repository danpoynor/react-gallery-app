import { Outlet, useParams } from 'react-router-dom';
import Error404 from '../components/Error404/Error404';
import Title from '../components/Title/Title';
// eslint-disable-next-line import/no-cycle
import PhotoContainer from '../components/PhotoContainer/PhotoContainer';
import { defaultTags } from '../settings';

// defaultTags used to check if user tried to type in something after /tag/ in url
const Tag = () => {
  // Get :tagTerm value from URL
  const { tagTerm } = useParams();

  // Clear search input in case user was previously searching
  const searchInput = document.querySelector('input[type="search"]');
  if (searchInput) {
    searchInput.value = '';
  }

  if (tagTerm) {
    // If tagTerm is not in the defaultTags array return an error message
    // Humanize the term before comparing to defaultTags array.
    const humanizedTerm = tagTerm.trim().replace(/\+/g, ' ');
    if (!defaultTags.includes(humanizedTerm)) {
      return (
        <Error404 />
      );
    }

    return (
      <main>
        <Title phrase={tagTerm} />
        <PhotoContainer phrase={tagTerm} />
      </main>
    );
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Tag;
