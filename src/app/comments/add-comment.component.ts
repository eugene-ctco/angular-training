import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormGroupDirective} from '@angular/forms';
import { UserComment } from './comment';
import { Store } from '@ngrx/store';
import { State, getUsername } from './state/username.reducer';
import * as UsernameActions from './state/username.actions';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  @Input() postId: number;
  @Output() onCommentAdded: EventEmitter<UserComment> = new EventEmitter<UserComment>();
  commentForm: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<State>) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      messageHeader: ['', [Validators.required]],
      messageBody: ['', [Validators.required, Validators.minLength(20)]],
      saveUsername: [false]
    });

    this.store.select(getUsername).subscribe(
      (state: State) => {
        this.commentForm.get('email').setValue(state.username);
        this.commentForm.get('saveUsername').setValue(state.username.length > 0);
      }
    );
  }

  save(form: FormGroup): void {
    if (!this.commentForm.valid) {
      return;
    }

    const comment: UserComment = {
        id: 0,
        postId: this.postId,
        name: this.commentForm.get('messageHeader').value,
        email: this.commentForm.get('email').value,
        body: this.commentForm.get('messageBody').value
      };

    form.reset();

    this.onCommentAdded.emit(comment);
    this.store.dispatch(UsernameActions.commentSubmit({ comment }));
  }
}
