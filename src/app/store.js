import { configureStore } from '@reduxjs/toolkit';
import { reducer as formLoginReducer } from 'redux-form';

export default configureStore({
  reducer: {
    form: formLoginReducer,
  },
});
