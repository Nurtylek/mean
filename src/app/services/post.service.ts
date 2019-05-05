import { Injectable } from '@angular/core';
import { Post } from '../core/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    apiUrl = environment.apiUrl;
    private posts: Post[] = [];
    private postUpdated = new Subject<{posts: Post[], postCount: number}>();

    constructor(private http: HttpClient, private router: Router) { }

    getPosts(postsPerPage: number, currentPage: number) {
        // return [...this.posts];
        const queryParams = `?pageSize=${postsPerPage}&page${currentPage}`;
        this.http.get<{ message: string, posts: Post[], maxPosts: number }>(`${this.apiUrl}/posts${queryParams}`).pipe(
        ).subscribe((data) => {
            this.posts = data.posts;
            this.postUpdated.next({posts: [...this.posts], postCount: data.maxPosts});
        });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    getPostById(id: string) {
        return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>(`${this.apiUrl}/posts/${id}`);
    }

    addPost(postModel: Post) {
        const postData = new FormData();
        postData.append('title', postModel.title);
        postData.append('content', postModel.content);
        postData.append('image', postModel.image, postModel.title);
        this.http.post<{ message: string, post: Post }>(`${this.apiUrl}/posts`, postData).subscribe(data => {
            // const post =  new Post({
            //     _id: data.post._id,
            //     title: data.post.title,
            //     content: data.post.content,
            //     imagePath: data.post.imagePath
            // });
            // this.posts.push(post);
            // this.postUpdated.next([...this.posts]);
            this.router.navigate(['/']);
        });
    }

    updatePost(post: Post) {
        let postData: FormData;
        if (typeof (post.image) === 'object') {
            postData = new FormData();
            postData.append('id', post._id);
            postData.append('title', post.title);
            postData.append('content', post.content);
            postData.append('image', post.image, post.title);
        }
        this.http.put(`${this.apiUrl}/posts/${post._id}`, postData).subscribe(() => {
            // const updatedPosts = [...this.posts];
            // // const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
            // // updatedPosts[oldPostIndex] = post;
            // this.posts = updatedPosts;
            // this.postUpdated.next([...this.posts]);
            this.router.navigate(['/']);
        });
    }

    deletePost(postId: string) {
        return  this.http.delete<{ message: string }>(`${this.apiUrl}/posts/${postId}`);
    }
}
