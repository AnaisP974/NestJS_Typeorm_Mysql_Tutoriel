export type CreateUserParams = {
    username: string;
    password: string;
}

export type UpdateUserParams = {
    username: string;
    password: string;
}

export type CreateUserProfileParams = {
    firstname: string;
    lastName: string;
    age: number;
    dob: string;
}

export type CreateUserPostParams = {
    title: string;
    description: string;
}