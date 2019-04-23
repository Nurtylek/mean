import { Injectable } from '@angular/core';
import {Post, PostResponseModel} from '../core/post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    apiUrl = environment.apiUrl;
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) { }

    getPosts() {
        // return [...this.posts];
        return this.http.get<PostResponseModel>(`${this.apiUrl}/posts`).pipe(
            map(r => r ? new PostResponseModel(r) : null)
        ).subscribe((data) => {
            this.posts = data.posts;
            this.postUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(post: Post) {
        const postModel = new Post({
            title: post.title,
            content: post.title
        });
        this.http.post<{message: string}>(`${this.apiUrl}/posts`, postModel).subscribe((data) => {
            console.log(data.message);
            this.posts.push(postModel);
            this.postUpdated.next([...this.posts]);
        });
    }
}
