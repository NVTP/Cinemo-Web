/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { getMovie, getInfoLogin } from 'src/redux/feature/infoSlice';

import MovieCard from '../movie-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';

// ----------------------------------------------------------------------

export default function MoviesView() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const info = useSelector(getInfoLogin);
  const [allMovie, setAllMovie] = useState([]);

  const getData = async () => {
    // console.log('info', info);
    if (_.isEmpty(info)) {
      router.push('/');
    } else {
      dispatch(getMovie()).then((val) => {
        // console.log('all movie ', val.payload.movies);
        setAllMovie(val.payload.movies);
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Movie Finder
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5, display: 'none' }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {allMovie.map((movie) => (
          <Grid key={movie.id} xs={12} sm={6} md={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
