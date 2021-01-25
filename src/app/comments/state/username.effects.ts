import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { CommentService } from '../comment.service';
import * as UsernameActions from './username.actions';

@Injectable()
export class UsernameEffects {

    constructor(private actions$: Actions,
                private commentService: CommentService){ }

    addComment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UsernameActions.commentSubmit),
            mergeMap(action => this.commentService.saveComment(action.comment).pipe(
                map(comment => UsernameActions.rememberUsername({ username: comment.email }))
            ))
        );
    });
}
