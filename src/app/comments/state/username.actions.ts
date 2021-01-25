import { createAction, props } from '@ngrx/store';
import { UserComment } from '../comment';

export const commentSubmit = createAction('[Comment] Comment submitted',
    props<{ comment: UserComment }>());

export const rememberUsername = createAction('[Comment] Save username',
    props<{ username: string }>());
