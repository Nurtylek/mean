export class Post {
    id: string;
    title: string;
    content: string;

    constructor(...models: Partial<Post>[]) {
        Object.assign(this, ...models);
    }
}


export class PostResponseModel {
    message: string;
    posts: Post[];

    constructor(...models: Partial<PostResponseModel>[]) {
        Object.assign(this, ...models);

        if (this.posts) {
            this.posts = this.posts.map(r => new Post(r));
        }
    }
}
