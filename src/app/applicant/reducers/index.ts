import { ActionReducerMap } from "@ngrx/store";
import { ApplicantState, applicantReducer } from '../reducers/applicant.reducers';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

export interface AppState {
    applicantState: ApplicantState;
    router: RouterReducerState<any>;
}

export const Reducers: ActionReducerMap<AppState> = {
    applicantState: applicantReducer,
    router: routerReducer
}

export const getApplicantsState = (state: AppState) => state.applicantState;
export const getRouterState = (state: AppState) => state.router;