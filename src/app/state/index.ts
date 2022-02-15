import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {iUser} from "./modeles/auth.modeles";
import {authReducer} from "./redusers/auth.reducer";
import {AuthEffects} from "./effects/auth.effects";
import {iHttp} from "./modeles/http.modeles";
import {httpReducer} from "./redusers/http.reduser";

export interface State {
  user: iUser,
  http: iHttp
}

export const reducers: ActionReducerMap<State> = {
  user: authReducer,
  http: httpReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const effects = [
  AuthEffects
]



