import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private postUrl = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postUrl)
        .pipe(
            catchError(null)
        );
    }

    getPost(id: number): Observable<Post> {
        const url = `${this.postUrl}/${id}`;
        return this.http.get<Post>(url)
        .pipe(
            catchError(null)
        );
    }
}
