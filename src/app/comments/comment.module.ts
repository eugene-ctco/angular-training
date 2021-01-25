import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { AddCommentComponent } from './add-comment.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/username.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsernameEffects } from './state/username.effects';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [CommentComponent, AddCommentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UsernameEffects])
  ],
  exports: [CommentComponent]
})
export class CommentModule { }
