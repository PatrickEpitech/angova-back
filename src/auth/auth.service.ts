import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import {User} from "../user/entities/user.entity";
import {Model} from "mongoose";
import { JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) {


    }

    async SignUp(signUpDto): Promise<{token: string}> {
        const {email, username, role, password} = signUpDto
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await this.userModel.create({
            email,
            username,
            role,
            password: hashedPassword
        })
        const token = this.jwtService.sign({
            id: user._id
        })
        return { token }
    }

}
