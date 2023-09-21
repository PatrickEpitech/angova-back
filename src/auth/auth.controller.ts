import {Body, Controller, Get, HttpException, HttpStatus, Post, Req} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignupDto} from "./dto/signup.dto";
import {LoginDto} from "./dto/login.dto";
import {RefreshTokenDto} from "./dto/refresh-token.dto";


@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/signup')
    signUp(@Body() create: SignupDto) {
        return this.authService.SignUp(create)
    }


    @Post('/login')
    login(@Body() data: LoginDto) {
        console.log("test")
        return this.authService.login(data)
    }

    @Get('/logout')
    logout(@Req() req: Request) {
        this.authService.logout(req['sub']);
    }

    @Post('/refresh')
    async refresh(@Body() refreshDto: RefreshTokenDto) {
        try {
            const newAccessToken = await this.authService.refresh(refreshDto.userId, refreshDto.refreshToken);
            return { accessToken: newAccessToken };
        } catch (error) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }
}
