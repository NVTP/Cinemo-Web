/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { login } from 'src/redux/feature/infoSlice';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const dispatch = useDispatch();

  const theme = useTheme();

  const router = useRouter();

  const initialDataForm = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('โปรดกรอกฟิลนี้'),
    password: yup.string().required('โปรดกรอกฟิลนี้'),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (values) => {
    const payload = {
      user: values.username,
      password: values.password,
    };
    dispatch(login(payload));
    router.push('/home');
  };

  const renderForm = (
    <div>
      <Formik
        initialValues={initialDataForm}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleClick}
      >
        {(formData) => (
          <form onSubmit={formData.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                name="username"
                label="Username"
                value={formData.values.username}
                onChange={formData.handleChange}
                error={!_.isEmpty(formData.errors.username)}
              />
              <div>
                {formData.errors.username && (
                  <span style={{ color: '#ff0011' }}>{formData.errors.username}</span>
                )}
              </div>

              <TextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.values.password}
                onChange={formData.handleChange}
                error={!_.isEmpty(formData.errors.password)}
                placeholder="********"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {formData.errors.password && (
                  <span style={{ color: '#ff0011' }}>{formData.errors.password}</span>
                )}
              </div>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              sx={{ mt: '2rem' }}
            >
              Login
            </LoadingButton>
          </form>
        )}
      </Formik>
    </div>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mb: '2rem' }}>
            Sign in to Cinemo Web
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
