import { Injectable } from '@angular/core';
import {Post} from '../core/post.model';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    constructor() { }

    getPosts() {
        return [...this.posts];
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(post: Post) {
        const postModel = new Post({
            title: post.title,
            content: post.title
        });
        this.posts.push(postModel);
        this.postUpdated.next([...this.posts]);
    }
}
