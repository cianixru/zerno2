import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsDefined, IsEnum, ValidateNested } from 'class-validator';

import { IsRussianPhoneNumber } from '@zern/nest';

enum SecretCodeDeliveryMethod {
    BY_SMS = 'by-sms',
}

class BaseIdentificationData {
}

class IdentificationDataForSignInBySms extends BaseIdentificationData {
    @ApiProperty()
    @IsRussianPhoneNumber()
    public readonly phoneNumber: string;
}

type IdentificationData = (
    | IdentificationDataForSignInBySms
);

const identificationDataTypeMap = {
    [SecretCodeDeliveryMethod.BY_SMS]: IdentificationDataForSignInBySms,
};

class CreateSecretCodeBody {
    @ApiProperty({ enum: SecretCodeDeliveryMethod })
    @IsEnum(SecretCodeDeliveryMethod)
    public readonly deliveryMethod: SecretCodeDeliveryMethod;

    @ApiProperty({ type: IdentificationDataForSignInBySms })
    @ValidateNested()
    @IsDefined()
    @Type((options) => identificationDataTypeMap[options?.object.deliveryMethod as SecretCodeDeliveryMethod])
    public readonly identificationData: IdentificationData;
}

export {
    SecretCodeDeliveryMethod,
    BaseIdentificationData,
    IdentificationDataForSignInBySms,
    IdentificationData,
    identificationDataTypeMap,
    CreateSecretCodeBody,
};
