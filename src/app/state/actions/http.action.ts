import {createAction, props} from "@ngrx/store";

export const errorHttp = createAction('[Http] errorAuth', props<{error:any}>());
export const errorReset = createAction('[Http] errorReset');
export const preLoaderStart = createAction('[Http] preLoaderStart');
export const preLoaderStop = createAction('[Http] preLoaderStop');
export const alertErrorDisabled = createAction('[Http] alertErrorDisabled');
export const alertTextInitial = createAction('[Http] alertTextInitial', props<{alertText: string}>());
export const alertTextDisabled = createAction('[Http] alertTextDisabled');
