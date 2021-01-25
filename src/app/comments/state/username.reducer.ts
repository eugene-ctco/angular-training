import { createReducer,  on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import * as CommentActions from './username.actions';


export interface State extends AppState.State {
    username: string;
}

const initialState: State = {
    username: ''
};

const getUserFeatureState = createFeatureSelector<State>('user');

export const getUsername = createSelector(
    getUserFeatureState,
    state => state
);

export const userReducer = createReducer<State>(
    initialState,
    on(CommentActions.rememberUsername, (state, action): State => {
        return {
            ...state,
            username: action.username
        };
    }),
    on(CommentActions.commentSubmit, (state, action): any => {
        return {
            ...state
        };
    })
);
