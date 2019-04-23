export class Post {
    title: string;
    content: string;

    constructor(...models: Partial<Post>[]) {
        Object.assign(this, ...models);
}
}
