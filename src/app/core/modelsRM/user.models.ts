export class SignInUpRM {
    email: string;
    password: string;

    constructor(...models: Partial<SignInUpRM>[]) {
        Object.assign(this, ...models);
    }
}
