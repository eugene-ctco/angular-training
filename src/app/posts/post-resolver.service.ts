import { Injectable } from "@angular/core";
import { Post } from './post';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PostService } from '../posts/post.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostResolver implements Resolve<Post> {

    constructor(private postService: PostService, private router: Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
        const id = route.paramMap.get('id');
        if(isNaN(+id)){
            this.router.navigate(["/404"])
            return EMPTY;
        }

        return this.postService.getPost(+id)
        .pipe(catchError(error => {
                console.log(error);
                this.router.navigate(["/404"])
                return EMPTY;
            })
        )
    }
    
}