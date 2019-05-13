import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material';
import {Post} from '../../core';
import {Abstract} from '../abstract';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent extends Abstract implements OnInit, OnDestroy {
    posts: Post[] = [];
    private subscription: Subscription;
    isLoading = false;
    // pagination
    totalPosts = 0;
    postsPerPage = 2;
    currentPage = 1;
    pageSizeOptions = [1, 2, 5, 10];

    constructor(injector: Injector) {super(injector); }

    ngOnInit() {
        this.isLoading = true;
        this.backend.postService.getPosts(this.postsPerPage, this.currentPage);
        this.subscription = this.backend.postService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
            this.isLoading = false;
            this.posts = postData.posts;
            this.totalPosts = postData.postCount;
        }, error => {
            console.log(error);
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
        });
    }

    onChangePage(event: PageEvent) {
        this.isLoading = true;
        this.currentPage = event.pageIndex + 1;
        this.postsPerPage = event.pageSize;
        this.backend.postService.getPosts(this.postsPerPage, this.currentPage);
    }
}
