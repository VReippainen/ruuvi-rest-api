import { Controller, Param, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import SensorService from '@services/sensors.service';

@Controller()
export class SensorsController {
  public sensorService = new SensorService();

  @Get('/sensors')
  @OpenAPI({ summary: 'Return a list of sensors' })
  async getSensors() {
    const data = await this.sensorService.findAllSensor();
    return { data, message: 'findAll' };
  }

  @Get('/sensors/:id')
  @OpenAPI({ summary: 'Return find a sensor' })
  async getSensorById(@Param('id') sensorId: string) {
    const data = await this.sensorService.findSensorById(sensorId);
    return { data, message: 'findOne' };
  }
}
