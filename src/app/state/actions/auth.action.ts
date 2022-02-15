import {createAction, props} from '@ngrx/store';
import {iUser} from "../modeles/auth.modeles";

export const logIn = createAction('[Auth Component] logIn', props<{user: iUser}>());
export const updateToken = createAction('[Auth Component] updateToken', props<{user: iUser}>());
export const setUser = createAction('[Auth Component] setPassword', props<{user: iUser}>());
export const setToken = createAction('[Auth Component] setToken', props<{user: iUser}>());
export const logOut = createAction('[Auth Component] logOun');
export const registration = createAction('[Auth Component] registration', props<{user: iUser}>());
