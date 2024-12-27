import { configureStore } from '@reduxjs/toolkit';
import branchReducer from './slices/branchSlice';
import csoReducer from './slices/csoSlice'
import authReducer from './slices/authSlice'
import loanReducer from './slices/LoanSlice'
import appReducer from './slices/appSlice'

const store = configureStore({
    reducer: {
        branches: branchReducer,
        cso: csoReducer,
        auth: authReducer,
        loan: loanReducer,
        app: appReducer,
    },
});

export default store;
