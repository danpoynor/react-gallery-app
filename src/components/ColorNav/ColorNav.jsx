import { NavLink } from 'react-router-dom';
import { defaultColors } from '../../settings';
import './ColorNav.css';

const ColorNav = () => {
  // Make sure there's no duplicates in defaultTags
  const uniqueColors = [...new Set(defaultColors)];

  // Use defaultTags from App settings to generate buttons
  const colorLinks = uniqueColors.map((colorTag) => (
    <li key={colorTag}>

      {/* For the 'to' url, replace any spaces with + in colorTag */}
      <NavLink to={`/color/${colorTag.trim().replace(/\s/g, '+')}`} title={colorTag} style={{ '--bc': colorTag }}>
        {/* Make the tag Title Case */}
        {colorTag.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase())}
      </NavLink>

    </li>
  ));

  return (
    <nav className="color-nav">
      Browse by color:
      <ul>
        {colorLinks}
      </ul>
    </nav>
  );
};

export default ColorNav;
