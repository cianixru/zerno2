import { Body, Controller, Delete, Patch, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { Action, CreateSecretCode, CreateSession, DeleteSession, DeleteSessions, UpdateSession } from '@zern/contract/monolith';

import { AllowExpiredAccessToken, ApiAction, MapHttpExceptions } from '@zern/nest';

import {
    AccountNotFoundException,
    RefreshTokenExpiredException,
    RefreshTokenInvalidException,
    RefreshTokenNotConfirmedException,
    SecretCodeInvalidException,
    SmsNotSentException,
} from '../exceptions';

import { AuthenticationService } from '../services';

@Controller()
@ApiTags('Authentication')
class AuthenticationController {
    public constructor (
        private readonly authenticationService: AuthenticationService,
    ) {
    }

    @Post(CreateSession.path)
    @ApiAction({
        Action,
        id: Action.CREATE_SESSION,
        description: `
            Метод создаёт сессию, если переданный секретный код проходит проверку.
            В ответ возвращает access-токен и refresh-токен
        `,
        allowWithoutAccessToken: true,
    })
    @MapHttpExceptions([
        [CreateSession.Exception.SecretCodeInvalidHttpException, SecretCodeInvalidException],
    ])
    @ApiCreatedResponse({
        type: CreateSession.Response,
        description: 'Сессия успешно создана',
    })
    public async createSession (
        @Body()
        body: CreateSession.Body,
    ): Promise <CreateSession.Response> {
        const { credentials } = body;
        const { phoneNumber, secretCode } = credentials;

        const { accessToken, refreshToken } = await this.authenticationService.createSession(phoneNumber, secretCode);

        return { accessToken, refreshToken };
    }

    @Patch(UpdateSession.path)
    @AllowExpiredAccessToken()
    @ApiAction({
        Action,
        id: Action.UPDATE_SESSION,
        description: `
            Метод обновляет сессию, если переданные access-токен и refresh-токен проходят проверку.
            В ответ возвращает access-токен и refresh-токен
        `,
    })
    @MapHttpExceptions([
        [UpdateSession.Exception.RefreshTokenInvalidHttpException, RefreshTokenInvalidException],
        [
            UpdateSession.Exception.SessionNotFoundHttpException,
            RefreshTokenExpiredException,
            RefreshTokenNotConfirmedException,
        ],
        [UpdateSession.Exception.AccountNotActiveHttpException, AccountNotFoundException],
    ])
    @ApiCreatedResponse({
        type: UpdateSession.Response,
        description: 'Сессия успешно обновлена',
    })
    public async updateSession (
        @Req()
        request: Request,

        @Body()
        body: UpdateSession.Body,
    ): Promise <UpdateSession.Response> {
        const user = (request.user as Record <string, unknown>);
        const { refreshToken: currentRefreshToken } = body;

        const { accessToken, refreshToken } = await this.authenticationService.updateSession(user, currentRefreshToken);

        return { accessToken, refreshToken };
    }

    @Delete(DeleteSession.path)
    @ApiAction({
        Action,
        id: Action.DELETE_SESSION,
        description: 'Метод удаляет текущую сессию пользователя',
    })
    @MapHttpExceptions([
        [DeleteSession.Exception.RefreshTokenInvalidHttpException, RefreshTokenInvalidException],
        [
            DeleteSession.Exception.SessionNotFoundHttpException,
            RefreshTokenExpiredException,
            RefreshTokenNotConfirmedException,
        ],
    ])
    @ApiOkResponse({ description: 'Сессия успешно удалена' })
    public async deleteSession (
        @Req()
        request: Request,

        @Body()
        body: DeleteSession.Body,
    ): Promise <DeleteSession.Response> {
        const user = (request.user as Record <string, unknown>);
        const { refreshToken: currentRefreshToken } = body;

        await this.authenticationService.deleteSession(user, currentRefreshToken);
    }

    @Delete(DeleteSessions.path)
    @ApiAction({
        Action,
        id: Action.DELETE_SESSIONS,
        description: `
            Метод удаляет активные сессии пользователя.
            Если значение 'retainCurrentSession' равно true, то текущая сессия пользователя сохранится
        `,
    })
    @MapHttpExceptions([
        [DeleteSessions.Exception.RefreshTokenInvalidHttpException, RefreshTokenInvalidException],
        [
            DeleteSessions.Exception.SessionNotFoundHttpException,
            RefreshTokenExpiredException,
            RefreshTokenNotConfirmedException,
        ],
    ])
    @ApiOkResponse({ description: 'Сессии успешно удалены' })
    public async deleteSessions (
        @Req()
        request: Request,

        @Body()
        body: DeleteSessions.Body,
    ): Promise <DeleteSessions.Response> {
        const user = (request.user as Record <string, unknown>);

        const {
            retainCurrentSession,
            refreshToken: currentRefreshToken,
        } = body;

        await this.authenticationService.deleteSessions(user, currentRefreshToken, retainCurrentSession);
    }

    @Post(CreateSecretCode.path)
    @ApiAction({
        Action,
        id: Action.CREATE_SECRET_CODE,
        description: 'Метод высылает секретный код пользователю',
        allowWithoutAccessToken: true,
    })
    @MapHttpExceptions([
        [CreateSecretCode.Exception.SecretCodeNotSentHttpException, SmsNotSentException],
    ])
    @ApiOkResponse({ description: 'Секретный код успешно отправлен' })
    public async createSecretCode (
        @Body()
        body: CreateSecretCode.Body,
    ): Promise <CreateSecretCode.Response> {
        const { identificationData } = body;

        await this.authenticationService.createSecretCode(identificationData.phoneNumber);
    }
}

export { AuthenticationController };
