import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

enum ActionType {
    ADD = 'add',
    MOVE = 'move',
}

class GetProductActionsPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly warehouseId: number;

    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly productId: number;
}

class ActionData {
    @ApiProperty({ enum: ActionType })
    public readonly type: ActionType;

    @ApiProperty({ type: 'object' })
    public readonly params: Record <string, unknown>;
}

class GetProductActionsResponse {
    @ApiProperty({
        type: [ActionData],
    })
    public readonly actions: ActionData[];
}

export { ActionType, GetProductActionsPathParams, GetProductActionsResponse };
