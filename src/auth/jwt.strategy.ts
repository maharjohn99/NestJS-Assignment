import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret-code',
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async validate(payload: { sub: User['id']; name: string }) {
    const user = await this.userService.findById(payload.sub.toString());
    if(!user){
      throw new UnauthorizedException();
    }
    return user;
  }
}
