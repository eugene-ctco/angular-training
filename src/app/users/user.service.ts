import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usersUrl = 'https://jsonplaceholder.typicode.com/users';

    constructor(private http: HttpClient) { }

    getUser(userId: number): Observable<User> {
        const url = `${this.usersUrl}/${userId}`;
        return this.http.get<User>(url)
        .pipe(
            catchError(null)
        );
    }
}
