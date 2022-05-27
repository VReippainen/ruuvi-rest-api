import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';
import { SensorsController } from './controllers/sensors.controller';

validateEnv();

const app = new App([IndexController, SensorsController]);
app.listen();
