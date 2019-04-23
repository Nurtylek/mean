import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../../core/post.model';
import {PostService} from '../../services/post.service';
import {Subscribable, Subscription} from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    private subscription: Subscription;
    constructor(private postService: PostService) { }

    ngOnInit() {
        this.posts = this.postService.getPosts();
        this.subscription = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
            this.posts = posts;
            console.log(posts);
        }, error => {
            console.log(error);
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
