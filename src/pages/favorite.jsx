import { Helmet } from 'react-helmet-async';

import FavoritesView from 'src/sections/favorites/view/favorites-view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <FavoritesView />
    </>
  );
}
