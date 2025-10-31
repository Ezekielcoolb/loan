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
import remittanceReducer from './slices/remittanceSlice'
import csoLoanReducer from './slices/csoLoanSlice'
import searchReducer from './slices/searchSlice'
import dashboardReducer from './slices/dashboardSlice'
import adminReducer from "./slices/adminSlice"
import otherLoanReducer from "./slices/otherLoanSlice"
import reportReducer from './slices/reportSlice'
import uploadReducer from './slices/uploadSlice'
import holidayReducer from './slices/holidaySlice'
import groupLeaderReducer from './slices/groupLeaderSlice'

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
        remittance: remittanceReducer,
        csoLoan: csoLoanReducer,
        dashboard: dashboardReducer,
        admin: adminReducer,
        otherLoan: otherLoanReducer,
        report: reportReducer,
        upload: uploadReducer,
        holiday: holidayReducer,
        search: searchReducer,
        groupLeader: groupLeaderReducer,
        
        
    },
});

export default store;
