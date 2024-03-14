/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import { useSelector } from 'react-redux';
/* eslint-disable perfectionist/sort-named-imports */
import { Helmet } from 'react-helmet-async';
/* eslint-disable import/no-extraneous-dependencies */
import React, { Suspense, lazy, useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

import { getInfoLogin } from 'src/redux/feature/infoSlice';

// import { ProductsView } from 'src/sections/movies/view';

const MoviesView = lazy(() => import('src/sections/movies/view/movies-view'));
// ----------------------------------------------------------------------

export default function ProductsPage() {
  const router = useRouter();
  const info = useSelector(getInfoLogin);
  useEffect(() => {
    if (_.isEmpty(info)) {
      router.push('/');
    }
  }, []);
  return (
    <>
      <Helmet>
        <title> My Finder | Minimal UI </title>
      </Helmet>

      <Suspense fallback={null}>
        <MoviesView />
      </Suspense>
      {/* <ProductsView /> */}
    </>
  );
}
