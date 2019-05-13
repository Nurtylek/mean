import {Injectable} from '@angular/core';
import {PostService} from './post.service';

@Injectable()
export class Backend {
    constructor(public postService: PostService) {}
}
