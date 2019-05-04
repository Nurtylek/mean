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
    totalPosts = 10;
    postsPerPage = 2;
    pageSizeOptions = [1, 2, 5, 10];
    constructor(private postService: PostService) { }

    ngOnInit() {
        this.isLoading = true;
        this.postService.getPosts();
        this.subscription = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
            this.isLoading = false;
            this.posts = posts;
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
        this.postService.deletePost(postId);
    }

    onChangePage($event: PageEvent) {
        console.log($event);
    }
}
