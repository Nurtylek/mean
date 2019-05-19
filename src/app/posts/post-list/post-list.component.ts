import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { Post } from '../../core';
import { Abstract } from '../abstract';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent extends Abstract implements OnInit, OnDestroy {
    posts: Post[] = [];
    private subscription: Subscription;
    isLoading = false;
    userId: string;
    // pagination
    totalPosts = 0;
    postsPerPage = 2;
    currentPage = 1;
    pageSizeOptions = [1, 2, 5, 10];
    isUserAuth = false;

    constructor(injector: Injector) { super(injector); }

    ngOnInit() {
        this.isLoading = true;
        this.backend.postService.getPosts(this.postsPerPage, this.currentPage);
        this.userId = this.backend.authService.getUserId();
        this.subscription = this.backend.postService.getPostUpdateListener().subscribe((postData: { posts: Post[], postCount: number }) => {
            this.isLoading = false;
            this.posts = postData.posts;
            this.totalPosts = postData.postCount;
        }, error => {
            console.log(error);
        });
        this.isUserAuth = this.backend.authService.getIsAuth();
        this.backend.authService.getAuthStatusListener().subscribe(isAuth => {
            this.isUserAuth = isAuth;
            this.userId = this.backend.authService.getUserId();
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onDelete(postId: string) {
        this.isLoading = true;
        this.backend.postService.deletePost(postId).subscribe(() => {
            this.backend.postService.getPosts(this.postsPerPage, this.currentPage);
            // this.posts = this.posts.filter(post => post._id !== postId);
        }, error => {
            this.isLoading = false;
        });
    }

    onChangePage(event: PageEvent) {
        this.isLoading = true;
        this.currentPage = event.pageIndex + 1;
        this.postsPerPage = event.pageSize;
        this.backend.postService.getPosts(this.postsPerPage, this.currentPage);
    }
}
