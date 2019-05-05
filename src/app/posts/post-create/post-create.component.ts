import { Component, OnInit } from '@angular/core';
import { Post } from '../../core/post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mymeType } from './myme-type.validator';

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
    form: FormGroup;
    imagePreview: string;

    constructor(private postService: PostService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.createForm();
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postService.getPostById(this.postId).subscribe(postData => {
                    this.isLoading = false;

                    this.post = new Post({
                        _id: postData._id,
                        title: postData.title,
                        content: postData.content,
                        imagePath: null
                    });
                });
                setTimeout(() => {
                    this.form.setValue({
                        title: this.post.title,
                        content: this.post.content,
                        image: this.post.imagePath
                    });
                }, 600);
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    createForm() {
        this.form = new FormGroup({
            title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
            content: new FormControl(null, { validators: [Validators.required] }),
            image: new FormControl(null, { validators: [Validators.required], asyncValidators: mymeType })
        });
    }

    onSavePost() {
        if (!this.form.valid) {
            return;
        }
        const post = new Post({
            title: this.form.value.title,
            content: this.form.value.content,
            _id: this.postId,
            image: this.form.value.image
        });
        this.isLoading = true;
        if (this.mode === 'create') {
            this.postService.addPost(post);
        } else {
            this.postService.updatePost(post);
        }
        this.form.reset();
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ image: file });
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
}
