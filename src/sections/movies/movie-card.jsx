/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { addFavorite, getFavorite } from 'src/redux/feature/infoSlice';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const favorite = useSelector(getFavorite);
  const router = useRouter();

  const handleAddFavorite = (data) => {
    dispatch(addFavorite(data));
  };

  const renderImg = (
    <Box
      component="img"
      alt={movie.synopsis_en}
      src={movie.poster_url}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderFavorite = (
    <Typography variant="subtitle1">
      <IconButton
        aria-label="delete"
        size="large"
        onClick={(e) => {
          e.preventDefault();
          handleAddFavorite(movie);
        }}
        sx={{
          zIndex: 9,
          top: 16,
          right: 16,
          position: 'absolute',
          textTransform: 'uppercase',
        }}
      >
        <Iconify
          width={40}
          icon={
            favorite.find((f) => f.id === movie.id)
              ? 'material-symbols:favorite'
              : 'material-symbols:favorite-outline'
          }
          sx={{
            color: favorite.find((f) => f.id === movie.id) ? '#ff0011' : '#ffff',
          }}
        />
      </IconButton>
    </Typography>
  );

  return (
    <Card sx={{ ':hover': { boxShadow: '3px 3px grey' } }}>
      <Box
        sx={{ pt: '100%', position: 'relative' }}
        onClick={(e) => {
          e.preventDefault();
          router.push(`/home/${movie.id}`);
        }}
      >
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          color="inherit"
          underline="hover"
          variant="subtitle2"
          noWrap
          onClick={(e) => {
            e.preventDefault();
            router.push(`/home/${movie.id}`);
          }}
        >
          {movie.title_th}({movie.title_en})
        </Link>
        {renderFavorite}

        <Stack
          direction="column"
          alignItems="start"
          justifyContent="space-between"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/home/${movie.id}`);
          }}
        >
          <Label variant="filled" color="info">
            <Typography variant="body1">rating {movie.rating}</Typography>
          </Label>
          <Typography variant="body1">{movie.release_date}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object,
};
