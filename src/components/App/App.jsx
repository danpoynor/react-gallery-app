/* eslint-disable import/no-cycle */
import { Route, Routes } from 'react-router-dom';
import Tag from '../../routes/Tag';
import Search from '../../routes/Search';
import Color from '../../routes/Color';
import Layout from '../Layout/Layout';
import Error404 from '../Error404/Error404';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={(
          <h2>Welcome!</h2>
          )}
      />
      <Route path="tag" element={<Tag />}>
        <Route
          index
          element={(
            <h2>☝️ Select a button name above ☝️</h2>
            )}
        />
        <Route path=":tagTerm" element={<Tag />} />
      </Route>
      <Route path="search" element={<Search />}>
        <Route
          index
          element={(
            <h2>Enter text to search for above.</h2>
            )}
        />
        <Route path=":searchTerm" element={<Search />} />
      </Route>
      <Route path="color" element={<Color />}>
        <Route path=":colorTerm" element={<Color />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Route>
  </Routes>
);

export default App;
