import { buildExceptionsMap, buildRoutePath } from '@zern/common';
import { RequestMethod } from '@zern/types';

import * as ExceptionsModule from './exceptions';

import * as BodyModule from './create-session.body';
import * as ResponseModule from './create-session.response';

namespace CreateSession {
    export import Body = BodyModule.CreateSessionBody;

    export import Response = ResponseModule.CreateSessionResponse;

    export import Exception = ExceptionsModule;

    export const ExceptionsMap = buildExceptionsMap(ExceptionsModule);

    export const method = RequestMethod.POST;

    export const path = buildRoutePath `/authentication/session`;
}

export { CreateSession };
