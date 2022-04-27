import { CustomDecorator, SetMetadata } from '@nestjs/common';

const ALLOW_WITHOUT_ACCESS_TOKEN_KEY = 'allow_without_access_token';

function AllowWithoutAccessToken (): CustomDecorator {
    return SetMetadata(ALLOW_WITHOUT_ACCESS_TOKEN_KEY, true);
}

export { ALLOW_WITHOUT_ACCESS_TOKEN_KEY, AllowWithoutAccessToken };
