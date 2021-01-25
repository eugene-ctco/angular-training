import { Component, OnInit, Inject } from '@angular/core';
import { User } from './user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  avatarApiUrl: string = 'https://eu.ui-avatars.com/api/';
  avatarUrl: string;
  user: User;

  constructor(
    private dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.user = data.author;
    }

  ngOnInit(): void {
    this.fillAuthorAvatarUrl();
  }

  close(){
    this.dialogRef.close();
  }

  fillAuthorAvatarUrl(): void{
    this.avatarUrl = this.avatarApiUrl;
    if (this.user !== null){
      const urlName = this.user.name.replace(' ', '+');
      this.avatarUrl = `${this.avatarApiUrl}?name=${urlName}`;
    }
  }
}
