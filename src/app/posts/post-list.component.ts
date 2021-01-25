import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  errorMessage = '';
  posts: Post[] = [];

  pageSize: number = 20;
  lowValue: number = 0;
  highValue: number = 20;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: posts => this.posts = posts,
      error: err => this.errorMessage = err
    });
  }

  getPaginatorData(event: PageEvent) : PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

}
