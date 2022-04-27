import { buildRoutePath } from '@zern/common';
import { RequestMethod } from '@zern/types';

import * as BodyModule from './upload-profile-picture.body';
import * as ParamsModule from './upload-profile-picture.params';
import * as ResponseModule from './upload-profile-picture.response';

namespace UploadProfilePicture {
    export import Param = ParamsModule.UploadProfilePictureParam;

    export import Params = ParamsModule.UploadProfilePictureParams;

    export import Body = BodyModule.UploadProfilePictureBody;

    export import Response = ResponseModule.UploadProfilePictureResponse;

    export const method = RequestMethod.POST;

    export const path = buildRoutePath `/user/${Param.USER_ID}/profile-picture`;
}

export { UploadProfilePicture };
