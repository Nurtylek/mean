import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../../core/post.model';
import {PostService} from '../../services/post.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    private subscription: Subscription;
    isLoading = false;
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
}
