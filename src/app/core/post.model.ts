export class Post {
    id: string;
    title: string;
    content: string;

    constructor(...models: Partial<Post>[]) {
        Object.assign(this, ...models);
    }
}

