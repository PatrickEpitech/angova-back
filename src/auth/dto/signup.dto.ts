import {IsNotEmpty, IsString, IsEmail, MinLength, IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SignupDto{
    @IsNotEmpty()
    @ApiProperty()
    @IsEmail({},{message: "Please enter correct credential"})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @MinLength(8)
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly username: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    readonly role: string;
}