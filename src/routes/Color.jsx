import { useParams, Navigate } from 'react-router-dom';
import Title from '../components/Title/Title';
// eslint-disable-next-line import/no-cycle
import PhotoContainer from '../components/PhotoContainer/PhotoContainer';

const Color = () => {
  // Get :colorTerm value from URL
  const { colorTerm } = useParams();

  if (!colorTerm) {
    return <Navigate to="/" />;
  }

  // TODO: If :colorTerm is not in the defaultColors array return an error message

  return (
    <main>
      <Title phrase={colorTerm} />
      <PhotoContainer phrase={colorTerm} />
    </main>
  );
};

export default Color;
