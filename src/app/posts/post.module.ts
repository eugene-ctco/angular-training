import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostDetailComponent } from './post-details.component';
import { RouterModule } from '@angular/router';
import { PostResolver } from './post-resolver.service';
import { PostListComponent } from './post-list.component';
import { CommentModule } from '../comments/comment.module';
import { UserModule } from '../users/user.module';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [PostDetailComponent, PostListComponent],
  imports: [
    CommonModule,
    CommentModule,
    UserModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: 'posts', component: PostListComponent
      },
      {
        path: 'posts/:id',
        component: PostDetailComponent,
        resolve: {
          resolvedData: PostResolver
        }
      }
    ])
  ]
})
export class PostModule { }