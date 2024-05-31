import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class LoginDtoInput {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    password: string;
}