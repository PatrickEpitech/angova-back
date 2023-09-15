import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

        @Post('/signup')
        signUp(@Body( ) signUpDto): Promise<{ token: string}>{
        return this.authService.SignUp(signUpDto)
        }


}