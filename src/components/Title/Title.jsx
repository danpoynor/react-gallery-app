import PropTypes from 'prop-types';

const Title = ({ phrase }) => {
  if (!phrase) { return null; }

  /**
    Apply some basic formatting to phrase
    - Strip whitespace from beginning and end of phrase.
    - Replace plus signs (+) with spaces.
    */
  const humanizedTerm = phrase.trim().replace(/\+/g, ' ');

  const headline = 'Flickr.com results for ';

  // Update the document title in the browser tab
  document.title = `${headline} "${humanizedTerm}"`;

  return (
    <h2>
      {headline}
      <mark data-testid="highlight">{humanizedTerm}</mark>
    </h2>
  );
};

Title.propTypes = {
  phrase: PropTypes.string.isRequired
};

export default Title;
