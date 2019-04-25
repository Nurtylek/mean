import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Post} from '../../core/post.model';
import {NgForm} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    private mode = 'create';
    private postId: string;
    post: Post;
    isLoading = false;

    constructor(private postService: PostService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            console.log(paramMap);
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postService.getPostById(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {id: postData._id, title: postData.title, content: postData.content};
                });
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onSavePost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const post = new Post({
            title: form.value.title,
            content: form.value.content
        });
        this.isLoading = true;
        if (this.mode === 'create') {
            this.postService.addPost(post);
        } else {
            this.postService.updatePost(post);
        }
        form.resetForm();
    }
}
