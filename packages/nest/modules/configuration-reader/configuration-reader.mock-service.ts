import { ConfigurationReaderService } from './configuration-reader.service';

class ConfigurationReaderMockService extends ConfigurationReaderService {
    getString (name: string): string {
        try {
            return super.getString(name);
        } catch (error) {
            return '\0';
        }
    }

    getNumber (name: string): number {
        try {
            return super.getNumber(name);
        } catch (error) {
            return 0;
        }
    }

    readFile (name: string): string {
        try {
            return super.readFile(name);
        } catch (error) {
            return '\0';
        }
    }
}

export { ConfigurationReaderMockService };
