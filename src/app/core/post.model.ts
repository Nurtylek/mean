export class Post {
    // tslint:disable-next-line:variable-name
    _id: string;
    title: string;
    content: string;
    imagePath: string;
    image: File;

    constructor(...models: Partial<Post>[]) {
        Object.assign(this, ...models);
    }
}

