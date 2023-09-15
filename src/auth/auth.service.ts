import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import {User} from "../user/entities/user.entity";
import {Model} from "mongoose";
import { JwtService} from "@nestjs/jwt";
import {SignupDto} from "../auth/dto/signup.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) {


    }

    async SignUp(SignupDto): Promise<{token: string}> {
        console.log("here")
        const {email, username, role, password} = SignupDto
        console.log("email",email)
        console.log("username",username)
        console.log("role",role)
        console.log("password",password)
        const hashedPassword = await bcrypt.hash(password,10)
        console.log("here", hashedPassword)
        const user = await this.userModel.create({
            email,
            username,
            role,
            password: hashedPassword
        })
        const token = this.jwtService.sign({
            id: user._id,
            role: user.role
        })
        return { token }
    }

    async login(loginDto): Promise<{ token: string }> {
        console.log("???")
        const { email, password } = loginDto;
        console.log(email, " " , password)
        const user = await this.userModel.findOne({ email: email  });
        if (!user) {
            throw new HttpException({ message: 'Utilisateur introuvable' }, HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new HttpException({ message: 'Mot de passe incorrect' }, HttpStatus.UNAUTHORIZED);
        }
        const token = this.jwtService.sign({
            id: user.id,
            role: user.role,
        });
        return { token };
    }
}
