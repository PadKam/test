import { createReducer, on } from '@ngrx/store';
import {logOut, setUser, setToken, updateToken} from "../actions/auth.action";
import {iUser} from "../modeles/auth.modeles";

export const initialState:iUser = {
  "id": -1,
  "login": '',
  "email": '',
  "password": '',
  "accessToken": '',
  "timeUpdateToken": 270000
}

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, user) => {
    let stateTemp = {...state};
    return stateTemp = {
      "id": user.user?.id,
      "login": user.user?.login,
      "email": user.user?.email,
      "password": user.user?.password,
      "accessToken": ''
    }
  }),

  on(setToken, (state, user) => {
    let stateTemp = {...state};
    return stateTemp = {
      "id": user.user.id,
      "login": user.user.login,
      "email": user.user.email,
      "password": stateTemp.password,
      "accessToken": "Bearer " + user.user.accessToken
    }
  }),

  on(logOut, (state) => {
    return {...state, id: -1, login: '', email: '', password:'', accessToken:''}
  }),
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
