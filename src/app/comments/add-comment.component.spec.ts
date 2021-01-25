import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentComponent } from './add-comment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../material.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import {getUsername, State} from './state/username.reducer';
import {UserComment} from './comment';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;
  let store: MockStore;
  const initialState: State = { username: 'John Doe' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommentComponent ],
      imports: [
        HttpClientTestingModule,
        MaterialModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    store.overrideSelector(getUsername, initialState);
    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set username on init', () => {
    component.ngOnInit();
    expect(component.commentForm.controls.email.value).toBe('John Doe');
    expect(component.commentForm.controls.saveUsername.value).toBeTrue();
  });

  it('should not set username on init', () => {
    store.overrideSelector(getUsername, {username: ''});
    component.ngOnInit();
    expect(component.commentForm.controls.email.value).toBe('');
    expect(component.commentForm.controls.saveUsername.value).toBeFalse();
  });

  it('should set username on init', () => {
    component.ngOnInit();
    expect(component.commentForm.controls.email.value).toBe('John Doe');
    expect(component.commentForm.controls.saveUsername.value).toBeTrue();
  });

  it('should emit on save', () => {
    component.ngOnInit();

    expect(component.commentForm.valid).toBeFalsy();
    component.commentForm.controls.email.setValue('abc@def.gh');
    component.commentForm.controls.messageHeader.setValue('header');
    component.commentForm.controls.messageBody.setValue('body body body body body body body');
    component.commentForm.controls.saveUsername.setValue(true);
    expect(component.commentForm.valid).toBeTruthy();

    spyOn(component.onCommentAdded, 'emit');
    component.save(component.commentForm);

    const comment: UserComment = {
      id: 0,
      postId: undefined,
      name: 'header',
      email: 'abc@def.gh',
      body: 'body body body body body body body'
    };

    expect(component.onCommentAdded.emit).toHaveBeenCalledWith(comment);
  });
});
