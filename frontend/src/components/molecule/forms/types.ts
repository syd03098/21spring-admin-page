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
}

export interface ChangePasswordFormData {
    password: string;
    newPassword: string;
}
