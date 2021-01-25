import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { MaterialModule } from '../material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let matDialogRefMock;

  beforeEach(async () => {

    matDialogRefMock = jasmine.createSpyObj(['close']);

    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [
        MaterialModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock},
        { provide: MAT_DIALOG_DATA, useValue: { author: { username: 'John Doe'}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.avatarApiUrl = 'http://avatar.com';
    component.user = {
      id: 0,
      name: 'John Doe',
      email: 'john.doe@email.com',
      username: 'jo'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog', () => {
    matDialogRefMock.close.and.returnValue(of(true));
    fixture.componentInstance.close();

    expect(matDialogRefMock.close).toHaveBeenCalled();
  });

  it('should fill avatar url on init', () => {
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.avatarUrl).toBe('http://avatar.com?name=John+Doe');
  })
});
