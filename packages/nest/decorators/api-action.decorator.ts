import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { normalizeSpaces } from '@zern/common';

import { AllowWithoutAccessToken } from './allow-without-access-token.decorator';

type ApiActionParams = {
    Action: Record <number | string, number | string>;
    id: number;
    description: string;
    allowWithoutAccessToken?: boolean;
};

const ACTION_ID_KEY = 'action_id';

const usedActions = new Set <string> ();

function generateSummary (actionName: string): string {
    const firstLetter = actionName.slice(0, 1);
    const restLetters = actionName.slice(1).replaceAll('_', ' ').toLowerCase();

    return `${firstLetter}${restLetters}`;
}

function ApiAction (params: ApiActionParams): MethodDecorator {
    const {
        Action,
        id,
        description: rawDescription,
        allowWithoutAccessToken = false,
    } = params;

    const action = (Action[id] as string);

    if (usedActions.has(action)) {
        throw new Error(`Action "${action}" has already been used`);
    }

    usedActions.add(action);

    const summary = generateSummary(action);
    const description = normalizeSpaces(rawDescription);
    const operationId = action.toLowerCase();

    const decorators: MethodDecorator[] = [
        SetMetadata(ACTION_ID_KEY, id),
        ApiOperation({
            summary,
            description,
            operationId,
        }),
    ];

    if (allowWithoutAccessToken) {
        decorators.push(AllowWithoutAccessToken());
    } else {
        decorators.push(ApiBearerAuth());
    }

    return applyDecorators(...decorators);
}

export { ACTION_ID_KEY, ApiAction };
