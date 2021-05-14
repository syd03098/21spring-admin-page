export interface LoginFormData {
    userid: string;
    password: string;
}

export interface SignUpFormData extends LoginFormData {
    username: string;
    email: string;
}
