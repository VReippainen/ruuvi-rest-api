export interface Sensor {
  id: string;
  latestMeasurement?: Measurement;
}

export interface Measurement {
  dataFormat: number;
  rssi: number;
  temperature: number;
  humidity: number;
  pressure: number;
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;
  battery: number;
  txPower: number;
  movementCounter: number;
  measurementSequenceNumber: number;
  mac: string;
}

export interface Tag {
  id: string;
  on: (...args: unknown[]) => void;
}
