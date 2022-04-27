import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsString, ValidateNested } from 'class-validator';

import { IsRussianPhoneNumber } from '@zern/nest';

enum AuthenticationMethod {
    BY_SECRET_CODE = 'by-secret-code',
}

class BaseAuthenticationCredentials {
    @ApiProperty()
    @IsRussianPhoneNumber()
    public readonly phoneNumber: string;
}

class CredentialsForAuthenticationBySecretCode extends BaseAuthenticationCredentials {
    @ApiProperty()
    @IsString()
    public readonly secretCode: string;
}

type AuthenticationCredentials = (
    | CredentialsForAuthenticationBySecretCode
);

const authenticationCredentialsTypeMap = {
    [AuthenticationMethod.BY_SECRET_CODE]: CredentialsForAuthenticationBySecretCode,
};

class CreateSessionBody {
    @ApiProperty({ enum: AuthenticationMethod })
    @IsEnum(AuthenticationMethod)
    public readonly authenticationMethod: AuthenticationMethod;

    @ApiProperty({ type: CredentialsForAuthenticationBySecretCode })
    @ValidateNested()
    @IsDefined()
    @Type((options) => authenticationCredentialsTypeMap[options?.object.authenticationMethod as AuthenticationMethod])
    public readonly credentials: AuthenticationCredentials;
}

export {
    AuthenticationMethod,
    BaseAuthenticationCredentials,
    CredentialsForAuthenticationBySecretCode,
    AuthenticationCredentials,
    authenticationCredentialsTypeMap,
    CreateSessionBody,
};
