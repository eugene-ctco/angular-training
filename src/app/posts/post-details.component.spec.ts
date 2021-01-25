import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PostDetailComponent } from './post-details.component';
import { MaterialModule } from '../material.module';
import { UserModule } from '../users/user.module';
import { ActivatedRoute } from '@angular/router';
import { CommentModule } from '../comments/comment.module';
import {UserService} from '../users/user.service';
import {of} from 'rxjs';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDetailComponent ],
      imports: [
        HttpClientTestingModule,
        MaterialModule
      ],
      providers: [
        { provide: CommentModule, useValue: {}},
        { provide: UserModule, useValue: {}},
        { provide: ActivatedRoute, useValue: { snapshot: { data: { resolvedData: { userId : 0} }}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService on init', () => {
    spyOn(mockService, 'getUser').and.returnValue(of({ id: 1, email: 'abc@cde.fg', name: 'name',  username: 'username' }));
    component.ngOnInit();
    expect(mockService.getUser).toHaveBeenCalled();
  });
});
