import { Payload, Transport } from '@amplitude/analytics-types';

export class FetchTransport implements Transport {
  async send(serverUrl: string, payload: Payload): Promise<Record<string, any> | null> {
    /* istanbul ignore if */
    if (typeof fetch === 'undefined') {
      throw new Error('FetchTransport is not supported');
    }
    const options: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(payload),
      method: 'POST',
    };
    const response = await fetch(serverUrl, options);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return (await response.json()) as Record<string, any>;
  }
}
