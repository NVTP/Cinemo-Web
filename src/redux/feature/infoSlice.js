import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// eslint-disable-next-line consistent-return
export const getMovie = createAsyncThunk('get/movie', async () => {
  try {
    const response = await axios.get('https://www.majorcineplex.com/apis/get_movie_avaiable');

    return response.data;
  } catch (e) {
    console.error(e);
  }
});

const initialState = {
  infoLogin: {},
  allMovie: [],
  favorite: [],
};

export const infoSlice = createSlice({
  name: 'infos',
  initialState,
  reducers: {
    logout: (state) => {
      state.infoLogin = {};
      state.allMovie = [];
      state.favorite = [];
    },
    login: (state, action) => {
      state.infoLogin = action.payload;
    },
    addFavorite: (state, action) => {
      // console.log('state ', state);
      state.favorite.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getMovie.fulfilled, (state, action) => {
      state.allMovie = action.payload.movies;
    });
  },
});

export const { login, logout, addFavorite } = infoSlice.actions;

export const getInfoLogin = (state) => state.infos.infoLogin;
export const getAllMovie = (state) => state.infos.allMovie;
export const getFavorite = (state) => state.infos.favorite;

export default infoSlice.reducer;
