import {Inject, Injectable} from '@angular/core';
import {CreatePostResponseModel, CreatePostRM, Post, PostResponseModel, PostsResponseModel, UpdatePostRM} from '../../core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {API_URL} from '../../helpers/helper';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private posts: Post[] = [];
    private postUpdated = new Subject<{posts: Post[], postCount: number}>();

    constructor(@Inject(API_URL) private apiUrl: string,
                private http: HttpClient,
                private router: Router) { }

    getPosts(postsPerPage: number, currentPage: number) {
        const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
        this.http.get<PostsResponseModel>(`${this.apiUrl}/posts${queryParams}`)
            .pipe(
                map(r => r ? new PostsResponseModel(r) : null)
            ).subscribe((data) => {
            this.posts = data.posts;
            this.postUpdated.next({posts: [...this.posts], postCount: data.maxPosts});
        });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    getPostById(id: string) {
        return this.http.get<PostResponseModel>(`${this.apiUrl}/posts/${id}`);
    }

    addPost(postModel: CreatePostRM) {
        const postData = new FormData();
        postData.append('title', postModel.title);
        postData.append('content', postModel.content);
        postData.append('image', postModel.image, postModel.title);

        this.http.post<CreatePostResponseModel>(`${this.apiUrl}/posts`, postData)
            .pipe(
                map(r => r ? new CreatePostResponseModel(r) : null)
            ).subscribe(() => {
            this.router.navigate(['/']);
        });
    }

    updatePost(post: UpdatePostRM) {
        let postData: FormData;
        if (typeof (post.image) === 'object') {
            postData = new FormData();
            postData.append('id', post._id);
            postData.append('title', post.title);
            postData.append('content', post.content);
            postData.append('image', post.image, post.title);
        }
        this.http.put(`${this.apiUrl}/posts/${post._id}`, postData).subscribe(() => {
            this.router.navigate(['/']);
        });
    }

    deletePost(postId: string) {
        return  this.http.delete<{ message: string }>(`${this.apiUrl}/posts/${postId}`);
    }
}
