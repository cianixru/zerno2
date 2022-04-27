import { Injectable } from '@nestjs/common';

import { ConfigurationReader } from '@zern/common';

@Injectable()
class ConfigurationReaderService {
    getString (name: string): string {
        return ConfigurationReader.getString(name);
    }

    getNumber (name: string): number {
        return ConfigurationReader.getNumber(name);
    }

    readFile (name: string): string {
        return ConfigurationReader.readFile(name);
    }
}

export { ConfigurationReaderService };
