export interface LoginFormData {
    userId: string;
    password: string;
}

export interface SignUpFormData extends LoginFormData {
    userName: string;
    email: string;
}

export interface EmailFormData {
    email: string;
    password: string;
}
