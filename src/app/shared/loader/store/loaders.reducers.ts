import * as LoadersActions from './loaders.actions';

export interface State {
  isLoading: boolean
};

export const initialState: State = {
  isLoading: false
};

export function loadersReducers(state = initialState, action: LoadersActions.LoaderActions) {
  switch (action.type) {
    case LoadersActions.REQUEST_STARTED:
      return {
        ...state,
        isLoading: true
      };
    case LoadersActions.REQUEST_FINISHED:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
