// import {Post} from '../models/post';

export class Post {
    // tslint:disable-next-line:variable-name
    _id: string;
    title: string;
    content: string;
    imagePath: string;
    image: File;
    creator: string;

    constructor(...models: Partial<Post>[]) {
        Object.assign(this, ...models);
    }
}



export class PostsResponseModel {
    message: string;
    posts: Post[];
    maxPosts: number;

    constructor(...models: Partial<PostsResponseModel>[]) {
        Object.assign(this, ...models);

        if (this.posts) {
            this.posts = this.posts.map(r => new Post(r));
        }
    }
}

export class PostResponseModel {
    // tslint:disable-next-line:variable-name
    _id: string;
    title: string;
    content: string;
    imagePath: string;
    creator: string;
    constructor(...models: Partial<PostResponseModel>[]) {
        Object.assign(this, ...models);
    }
}


export class CreatePostResponseModel {
    message: string;
    post: Post[];

    constructor(...models: Partial<CreatePostResponseModel>[]) {
        Object.assign(this, ...models);
    }
}

export class CreatePostRM {
    title: string;
    content: string;
    image: File;

    constructor(...models: Partial<CreatePostRM>[]) {
        Object.assign(this, ...models);
    }
}

export class UpdatePostRM {
    // tslint:disable-next-line:variable-name
    _id: string;
    title: string;
    content: string;
    imagePath: string;
    image: File;
    creator: string;
    constructor(...models: Partial<UpdatePostRM>[]) {
        Object.assign(this, ...models);
    }
}

