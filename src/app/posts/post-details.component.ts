import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from '../users/user.component';
import { User } from '../users/user';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: Post;
  author: User;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private userService: UserService) { }

  ngOnInit(): void {
    this.post = this.route.snapshot.data.resolvedData;

    this.userService.getUser(this.post.userId).subscribe({
      next: user => this.author = user
    });
  }

  openUserInfoDialog(): void {
    this.dialog.open(UserComponent, {data: { author: this.author }});
  }
}
