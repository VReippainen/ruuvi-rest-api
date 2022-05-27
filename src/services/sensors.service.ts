import { logger } from '@/utils/logger';
import { HttpException } from '@exceptions/HttpException';
import { Measurement, Sensor, Tag } from '@interfaces/sensors.interface';
import ruuvi from 'node-ruuvitag';

class SensorService {
  public sensors: Sensor[] = [];

  constructor() {
    this._initialize();
  }

  _initialize() {
    ruuvi.on('found', (tag: Tag) => {
      const sensorId = tag.id;
      logger.info(`Found sensor with ID ${sensorId}`);
      const sensor = this._getSensorById(sensorId);
      if (!sensor) {
        this.sensors.push({ id: sensorId });
      }
      tag.on('updated', (data: Measurement) => {
        logger.info(`Sensor with ID ${sensorId} updated`);
        this.sensors = this.sensors.map(s => (s.id === sensorId ? { id: sensorId, latestMeasurement: { ...data, date: new Date() } } : s));
      });
    });
  }

  public async findAllSensor(): Promise<Sensor[]> {
    return this.sensors;
  }

  private _getSensorById(sensorId: string): Sensor {
    return this.sensors.find(({ id }) => id === sensorId);
  }

  public async findSensorById(sensorId: string): Promise<Sensor> {
    const sensor = this._getSensorById(sensorId);
    if (!sensor) {
      throw new HttpException(409, `No sensor data with sensor id ${sensorId}`);
    }
    return sensor;
  }
}

export default SensorService;
