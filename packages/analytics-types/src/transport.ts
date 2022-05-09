import { Payload } from './payload';

export interface Transport {
  send(serverUrl: string, payload: Payload): Promise<Record<string, any> | null>;
}

export enum TransportType {
  XHR = 'xhr',
  SendBeacon = 'beacon',
  Fetch = 'fetch',
}
