import { buildExceptionsMap, buildRoutePath } from '@zern/common';
import { RequestMethod } from '@zern/types';

import * as ExceptionsModule from './exceptions';

import * as BodyModule from './update-session.body';
import * as ResponseModule from './update-session.response';

namespace UpdateSession {
    export import Body = BodyModule.UpdateSessionBody;

    export import Response = ResponseModule.UpdateSessionResponse;

    export import Exception = ExceptionsModule;

    export const ExceptionsMap = buildExceptionsMap(ExceptionsModule);

    export const method = RequestMethod.PATCH;

    export const path = buildRoutePath `/authentication/session`;
}

export { UpdateSession };
