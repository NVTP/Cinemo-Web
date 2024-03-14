/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import { useEffect } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { getFavorite, getInfoLogin } from 'src/redux/feature/infoSlice';

import MovieCard from '../../movies/movie-card';

// ----------------------------------------------------------------------

export default function FavoritesView() {
  const favoriteMovies = useSelector(getFavorite);
  const info = useSelector(getInfoLogin);
  const router = useRouter();

  useEffect(() => {
    if (_.isEmpty(info)) {
      router.push('/');
    }
  }, []);
  return (
    <div>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Movie Favorite
            </Typography>
          </Grid>
          {_.isEmpty(favoriteMovies) ? (
            <Grid item xs={12}>
              <h1>Not Found Favorite</h1>
            </Grid>
          ) : (
            favoriteMovies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
}
