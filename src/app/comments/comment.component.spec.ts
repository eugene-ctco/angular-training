import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { MaterialModule } from '../material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddCommentComponent } from './add-comment.component';
import { FormBuilder } from '@angular/forms';
import {CommentService} from './comment.service';
import {of} from 'rxjs';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let mockService: CommentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MaterialModule, useValue: {}},
        { provide: AddCommentComponent, useValue: {}},
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockService = TestBed.inject(CommentService);
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service on init', () => {
    spyOn(mockService, 'getComments').and.returnValue(of([]));
    component.ngOnInit();
    expect(mockService.getComments).toHaveBeenCalled();
  });
});
