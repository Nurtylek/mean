import {Injectable} from '@angular/core';
import {PostService} from './post.service';
import {AuthService} from './auth.service';

@Injectable()
export class Backend {
    constructor(public authService: AuthService,
                public postService: PostService) {}
}
