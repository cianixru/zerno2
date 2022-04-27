import { buildExceptionsMap, buildRoutePath } from '@zern/common';
import { RequestMethod } from '@zern/types';

import * as ExceptionsModule from './exceptions';

import * as BodyModule from './create-secret-code.body';
import * as ResponseModule from './create-secret-code.response';

namespace CreateSecretCode {
    export import Body = BodyModule.CreateSecretCodeBody;

    export import Response = ResponseModule.CreateSecretCodeResponse;

    export import Exception = ExceptionsModule;

    export const ExceptionsMap = buildExceptionsMap(ExceptionsModule);

    export const method = RequestMethod.POST;

    export const path = buildRoutePath `/authentication/secret-code`;
}

export { CreateSecretCode };
