import { buildExceptionsMap, buildRoutePath } from '@zern/common';
import { RequestMethod } from '@zern/types';

import * as ExceptionsModule from './exceptions';

import * as BodyModule from './create-user.body';
import * as ResponseModule from './create-user.response';

namespace CreateUser {
    export import Body = BodyModule.CreateUserBody;

    export import Response = ResponseModule.CreateUserResponse;

    export import Exception = ExceptionsModule;

    export const ExceptionsMap = buildExceptionsMap(ExceptionsModule);

    export const method = RequestMethod.POST;

    export const path = buildRoutePath `/user`;
}

export { CreateUser };
