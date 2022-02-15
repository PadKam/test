import { createReducer, on } from '@ngrx/store';
import {iHttp} from "../modeles/http.modeles";
import {
  alertErrorDisabled, alertTextDisabled, alertTextInitial,
  errorHttp,
  errorReset,
  preLoaderStart,
  preLoaderStop
} from "../actions/http.action";

export const initialState:iHttp = {
  "err": {},
  "preLoader": false,
  "alertError": false,
  "alertText": 'error'
}

const _httpReducer = createReducer(
  initialState,
  on(errorHttp, (state, http) => {
    return{...state, err: http.error, alertError: true};
  }),
  on(errorReset, (state, http) => {
    return{...state, err: {}};
  }),
  on(preLoaderStart, (state, http) => {
    return{...state, preLoader: true};
  }),
  on(preLoaderStop, (state, http) => {
    return{...state, preLoader: false};
  }),
  on(alertErrorDisabled, (state, http) => {
    return{...state, alertError: false};
  }),
  on(alertErrorDisabled, (state, http) => {
    return{...state, alertError: false};
  }),
  on(alertTextInitial, (state, http) => {
    return{...state, alertText: http.alertText};
  }),
  on(alertTextDisabled, (state, http) => {
    return{...state, alertText: ''};
  }),
);

export function httpReducer(state: any, action: any) {
  return _httpReducer(state, action);
}
