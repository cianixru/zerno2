import { Injectable } from '@nestjs/common';

import axios, { AxiosInstance } from 'axios';

import { RequestMethod } from '@zern/types';

import { MonolithConfigurationService } from '../../../common';

import { SmsNotSentException } from '../exceptions';

type SendSmsQueryParams = {
    api_id: string;
    to: string;
    msg: string;
    json: 1;
};

type SendSmsResponse = {
    status: 'OK' | 'ERROR';
};

@Injectable()
class AuthenticationSmsService {
    private readonly axiosInstance: AxiosInstance;

    public constructor (
        private readonly monolithConfigurationService: MonolithConfigurationService,
    ) {
        this.axiosInstance = axios.create({
            method: RequestMethod.GET,
            baseURL: 'https://sms.ru/sms/send',
        });
    }

    public async send (phoneNumber: string, message: string): Promise <void> {
        const queryParams: SendSmsQueryParams = {
            // eslint-disable-next-line camelcase
            api_id: this.monolithConfigurationService.smsRuApiId,
            to: phoneNumber.slice(1),
            msg: message,
            json: 1,
        };

        const { data } = await this.axiosInstance.request <SendSmsResponse> ({ params: queryParams });

        if (data.status === 'ERROR') {
            throw new SmsNotSentException();
        }
    }
}

export { AuthenticationSmsService };
