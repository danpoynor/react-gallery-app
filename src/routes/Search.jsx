import { Outlet, useParams } from 'react-router-dom';
import Title from '../components/Title/Title';
// eslint-disable-next-line import/no-cycle
import PhotoContainer from '../components/PhotoContainer/PhotoContainer';

const Search = () => {
  // Get :searchTerm value from URL
  const { searchTerm } = useParams();

  if (!searchTerm) {
    return (
      <main>
        <Outlet />
      </main>
    );
  }

  return (
    <main>
      <Title phrase={searchTerm} />
      <PhotoContainer phrase={searchTerm} />
    </main>
  );
};

export default Search;
