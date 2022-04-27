import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ApiAction } from '@zern/nest';

import { ExampleService } from '../services';


@Controller()
@ApiTags('Example')
class ExampleController {
    public constructor (
        private readonly exampleService: ExampleService,
    ) {
    }

    @Get()
    @ApiAction({
        Action: { [-1]: 'EXAMPLE_GET_METHOD' },
        id: -1,
        description: 'Метод возвращает строку "Hello World!"',
    })
    @ApiOkResponse({ description: 'Мир успешно поприветствован' })
    public async getHello (): Promise <string> {
        return this.exampleService.getHello();
    }
}

export { ExampleController };
