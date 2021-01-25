import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserComment } from './comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private commentUrl = 'http://jsonplaceholder.typicode.com/comments';

    constructor(private http: HttpClient) { }

    getComments(postId: number): Observable<UserComment[]> {
        const options = { params: new HttpParams().set('postId', postId.toString()) };
        return this.http.get<UserComment[]>(this.commentUrl, options)
        .pipe(catchError(null));
    }

    saveComment(comment: UserComment): Observable<UserComment> {
        return this.http.post<UserComment>(this.commentUrl, comment);
    }
}
