import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../../core/post.model';
import {PostService} from '../../services/post.service';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    private subscription: Subscription;
    isLoading = false;
    // pagination
    totalPosts = 0;
    postsPerPage = 2;
    currentPage = 1;
    pageSizeOptions = [1, 2, 5, 10];
    constructor(private postService: PostService) { }

    ngOnInit() {
        this.isLoading = true;
        this.postService.getPosts(this.postsPerPage, this.currentPage);
        this.subscription = this.postService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
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
        this.postService.deletePost(postId).subscribe(() => {
            this.postService.getPosts(this.postsPerPage, this.currentPage);
            // this.posts = this.posts.filter(post => post._id !== postId);
        });
    }

    onChangePage(event: PageEvent) {
        this.isLoading = true;
        this.currentPage = event.pageIndex + 1;
        this.postsPerPage = event.pageSize;
        this.postService.getPosts(this.postsPerPage, this.currentPage);
    }
}
