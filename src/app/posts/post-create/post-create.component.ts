import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Post} from '../../core/post.model';
import {NgForm} from '@angular/forms';
import {PostService} from '../../services/post.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    constructor(private postService: PostService) { }

    ngOnInit() {
    }

    onSavePost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const post = new Post({
            title: form.value.title,
            content: form.value.content
        });
        this.postService.addPost(post);
        form.resetForm();
    }
}
