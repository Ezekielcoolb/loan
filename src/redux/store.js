import { configureStore } from '@reduxjs/toolkit';
import branchReducer from './slices/branchSlice';
import csoReducer from './slices/csoSlice'
import authReducer from './slices/authSlice'
import loanReducer from './slices/LoanSlice'
import appReducer from './slices/appSlice'
import branchLoanReducer from './slices/branchLoanSlice'
import notificationReducer from './slices/notificationSlice'
import targetReducer from './slices/targetSlice'
import guarantorReducer from './slices/guarantorSlice'

const store = configureStore({
    reducer: {
        branches: branchReducer,
        cso: csoReducer,
        auth: authReducer,
        loan: loanReducer,
        app: appReducer,
        loanBranches: branchLoanReducer,
        notifications: notificationReducer,
        target: targetReducer,
        guarantor: guarantorReducer,
    },
});

export default store;
