import { buildExceptionsMap, buildRoutePath } from '@zern/common';
import { RequestMethod } from '@zern/types';

import * as ExceptionsModule from './exceptions';

import * as BodyModule from './delete-sessions.body';
import * as ResponseModule from './delete-sessions.response';

namespace DeleteSessions {
    export import Body = BodyModule.DeleteSessionsBody;

    export import Response = ResponseModule.DeleteSessionsResponse;

    export import Exception = ExceptionsModule;

    export const ExceptionsMap = buildExceptionsMap(ExceptionsModule);

    export const method = RequestMethod.DELETE;

    export const path = buildRoutePath `/authentication/sessions`;
}

export { DeleteSessions };
