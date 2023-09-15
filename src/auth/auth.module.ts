import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigService
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from '../user/entities/user.entity';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string | number>('JWT_EXPIRE'),
                },
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserModel }]),
        ConfigModule.forRoot(),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
