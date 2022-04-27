import { CustomDecorator, SetMetadata } from '@nestjs/common';

const ALLOW_EXPIRED_ACCESS_TOKEN_KEY = 'allow_expired_access_token';

function AllowExpiredAccessToken (): CustomDecorator {
    return SetMetadata(ALLOW_EXPIRED_ACCESS_TOKEN_KEY, true);
}

export { ALLOW_EXPIRED_ACCESS_TOKEN_KEY, AllowExpiredAccessToken };
