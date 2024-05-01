import { AuthService } from './auth.service';
import { User } from './user.model';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(user: User): Promise<string>;
    login({ email, password }: {
        email: any;
        password: any;
    }): Promise<{
        access_token: string;
        message: string;
    } | string>;
    getUsers(req: any): Promise<User[]>;
}
