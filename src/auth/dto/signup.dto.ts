import {IsNotEmpty, IsString, IsEmail, MinLength, IsNumber} from "class-validator";

export class SignupDto{
    @IsNotEmpty()
    @IsEmail({},{message: "Please enter correct credential"})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsNumber()
    readonly role: string;
}