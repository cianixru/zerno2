import { buildExceptionsMap, buildRoutePath } from '@zern/common';
import { RequestMethod } from '@zern/types';

import * as ExceptionsModule from './exceptions';

import * as BodyModule from './delete-session.body';
import * as ResponseModule from './delete-session.response';

namespace DeleteSession {
    export import Body = BodyModule.DeleteSessionBody;

    export import Response = ResponseModule.DeleteSessionResponse;

    export import Exception = ExceptionsModule;

    export const ExceptionsMap = buildExceptionsMap(ExceptionsModule);

    export const method = RequestMethod.DELETE;

    export const path = buildRoutePath `/authentication/session`;
}

export { DeleteSession };
