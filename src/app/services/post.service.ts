import {Injectable} from '@angular/core';
import {Post} from '../core/post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    apiUrl = environment.apiUrl;
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient, private router: Router) { }

    getPosts() {
        // return [...this.posts];
        this.http.get<{message: string, posts: any[]}>(`${this.apiUrl}/posts`).pipe(
            map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.title,
                        id: post._id
                    };
                });
            })
        ).subscribe((data) => {
            this.posts = data;
            this.postUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    getPostById(id: string) {
        return this.http.get<{_id: string , title: string, content: string}>(`${this.apiUrl}/posts/${id}`);
    }

    addPost(post: Post) {
        this.http.post<{message: string, postId: string}>(`${this.apiUrl}/posts`, post).subscribe((data) => {
            post.id = data.postId;
            this.posts.push(post);
            this.postUpdated.next([...this.posts]);
            this.router.navigate(['/']);
        });
    }

    updatePost(post: Post) {
        this.http.put(`${this.apiUrl}/posts/${post.id}`, post).subscribe(() => {
            const updatedPosts = [...this.posts];
            // const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
            // updatedPosts[oldPostIndex] = post;
            this.posts = updatedPosts;
            this.postUpdated.next([...this.posts]);
            this.router.navigate(['/']);
        });
    }

    deletePost(postId: string) {
        this.http.delete<{message: string}>(`${this.apiUrl}/posts/${postId}`).subscribe(() => {
            this.posts = this.posts.filter(post => post.id !== postId);
            this.postUpdated.next([...this.posts]);
        });
    }
}
