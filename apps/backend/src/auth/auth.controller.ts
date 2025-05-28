import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {LocalAuthGuard} from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('register')
    async register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto.email, dto.name, dto.password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
