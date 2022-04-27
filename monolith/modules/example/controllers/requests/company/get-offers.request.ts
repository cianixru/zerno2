import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsDefined, IsInt, IsString } from 'class-validator';

import { TransformToNumber, TransformToNumberArray } from '@zern/nest';

class GetOffersQueryParams {
    @ApiProperty({
        isArray: true,
        type: 'number',
    })
    @IsArray()
    @IsInt({ each: true })
    @TransformToNumberArray()
    public readonly companyIds: number[];

    @ApiProperty()
    @IsString()
    public readonly productType: string;

    @ApiProperty()
    @IsString()
    public readonly offersType: string;

    @ApiProperty()
    @IsString()
    public readonly address: string;

    @ApiProperty({ type: 'object' })
    @IsDefined()
    public readonly filters: Record <string, unknown>;

    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly page: number;

    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly itemsPerPage: number;

    @ApiProperty()
    @IsString()
    public readonly sortBy: string;

    @ApiProperty()
    @IsString()
    public readonly status: string;

    @ApiProperty()
    @IsString()
    public readonly sortingDirection: string;
}

class OfferData {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly companyId: number;

    @ApiProperty()
    public readonly productType: string;

    @ApiProperty()
    public readonly offerType: string;

    @ApiProperty()
    public readonly status: string;

    @ApiProperty()
    public readonly count: number;

    @ApiProperty()
    public readonly price: number;

    @ApiProperty()
    public readonly address: string;

    @ApiProperty()
    public readonly distance: number;

    @ApiProperty()
    public readonly usingNds: boolean;

    @ApiProperty({ type: 'object' })
    public readonly parameters: Record <string, unknown>;
}

class GetOffersResponse {
    @ApiProperty({
        type: [OfferData],
    })
    public readonly offers: OfferData[];
}

export { GetOffersQueryParams, GetOffersResponse };
