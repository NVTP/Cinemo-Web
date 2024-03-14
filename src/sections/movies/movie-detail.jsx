/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Grid, Container, Box, Typography, Card } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { getAllMovie, getInfoLogin } from 'src/redux/feature/infoSlice';

export default function Detail() {
  const { movie } = useParams();
  const info = useSelector(getInfoLogin);

  const allMovie = useSelector(getAllMovie);
  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (_.isEmpty(info)) {
      router.push('/');
    } else {
      const detail = allMovie.find((f) => f.id?.toString() === movie?.toString());
      setMovieDetail(detail);
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Container>
          <Grid container>
            {_.isEmpty(movieDetail) || _.isUndefined(movieDetail) || _.isEmpty(movie) ? (
              <Grid item xs={12}>
                <h1>Not Found</h1>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography variant="h3" color="initial">
                  {movieDetail.title_th}
                </Typography>
                <Typography variant="h3" color="initial">
                  {movieDetail.title_en}
                </Typography>
                <Box>
                  <Box
                    component="img"
                    alt={movieDetail.synopsis_en}
                    src={movieDetail.poster_url}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
                <Card sx={{ padding: '1rem', mt: '1rem' }}>
                  <video controls autoPlay width="100%" height="400">
                    <source src={movieDetail.tr_mp4} type="video/mp4" />
                  </video>
                  <hr />

                  <Typography variant="body1" color="initial">
                    นักแสดง: {movieDetail.actor}
                  </Typography>
                  <hr />
                  <Typography variant="body1" color="initial">
                    ผู้กำกับ: {movieDetail.director}
                  </Typography>
                  <hr />

                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                  >
                    หมวดหมู่: {movieDetail.genre}
                  </Typography>
                  <hr />

                  <Typography variant="body1" color="initial">
                    ความยาว: {movieDetail.duration} นาที
                  </Typography>
                  <hr />

                  <Typography variant="body1" color="initial">
                    วันฉาย: {movieDetail.release_date}
                  </Typography>
                  <hr />

                  <Typography variant="body1" color="initial">
                    &nbsp;&nbsp; {movieDetail.synopsis_th}
                  </Typography>
                </Card>
              </Grid>
            )}
          </Grid>
        </Container>
      )}
    </div>
  );
}
