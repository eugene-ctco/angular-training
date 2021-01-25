import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from './comment.service';
import { UserComment } from './comment';

@Component({
  selector: 'app-post-comments',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() postId: number;

  comments: UserComment[] = [];

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {

    this.commentService.getComments(+this.postId).subscribe({
      next: comments => {
        this.comments = comments;
      }
    });
  }

  updateCommentList(comment: UserComment): void {
    this.comments.push(comment);
  }
}
