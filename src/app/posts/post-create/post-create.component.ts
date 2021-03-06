import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParamMap } from '@angular/router';
import { mymeType } from './mime-type.validator';
import {CreatePostRM, PostResponseModel, UpdatePostRM} from '../../core';
import {Abstract} from '../abstract';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent extends Abstract implements OnInit, OnDestroy {
    private mode = 'create';
    private postId: string;
    post: PostResponseModel;
    isLoading = false;
    form: FormGroup;
    imagePreview: string;
    private authStatusSub: Subscription;

    constructor(injector: Injector) {super(injector); }

    ngOnInit() {

        this.authStatusSub = this.backend.authService.getAuthStatusListener().subscribe(authStatus => {
            this.isLoading = false;
        });

        this.createForm();
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.backend.postService.getPostById(this.postId).subscribe(postData => {
                    this.isLoading = false;

                    this.post = new PostResponseModel({
                        _id: postData._id,
                        title: postData.title,
                        content: postData.content,
                        imagePath: null,
                        creator: postData.creator
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
        const post = new CreatePostRM({
            title: this.form.value.title,
            content: this.form.value.content,
            image: this.form.value.image
        });
        const postToUpdate = new UpdatePostRM({
            title: this.form.value.title,
            content: this.form.value.content,
            image: this.form.value.image,
            _id: this.postId,
            creator: null
        });
        this.isLoading = true;
        if (this.mode === 'create') {
            this.backend.postService.addPost(post);
        } else {
            this.backend.postService.updatePost(postToUpdate);
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

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.authStatusSub.unsubscribe();
    }
}
