import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {Injectable} from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(email: string, name: string, plainPassword: string) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(plainPassword, salt);

        const user = await this.usersService.create({
            email,
            name,
            password: hash,
        });

        const { password, ...result } = user;
        return result;
    }

    async validateUser(email: string, plainPassword: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            return null;
        }

        const matches = await bcrypt.compare(plainPassword, user.password);
        if (!matches) {
            return null;
        }

        const { password, ...safeUser } = user;

        return safeUser;
    }

    async login(user: { id: bigint; email: string }) {
        const payload = { sub: user.id.toString(), email: user.email };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
