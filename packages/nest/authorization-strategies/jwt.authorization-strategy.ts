import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { Nullable } from '@zern/types';

@Injectable()
class JwtAuthorizationStrategy extends PassportStrategy(Strategy) {
    public constructor (
        private readonly timeToLifeInSeconds: number,
        publicKey: string,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: publicKey,
        });
    }

    public async validate (token: Record <string, unknown>) {
        const isTokenExpired = this.isTokenExpired(token.iat as number);

        return { token, isTokenExpired };
    }

    private isTokenExpired (createdTimeInSeconds: Nullable <number> = null): boolean {
        if (createdTimeInSeconds === null) {
            return true;
        }

        const expirationTimeInSeconds = (createdTimeInSeconds + this.timeToLifeInSeconds);
        const expirationTime = (expirationTimeInSeconds * 1000);
        const currentTime = Date.now();

        return (expirationTime < currentTime);
    }
}

export { JwtAuthorizationStrategy };
