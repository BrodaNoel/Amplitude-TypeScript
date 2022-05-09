import { AmplitudeLight } from '../src/light-client';
import { API_KEY, USER_ID } from './helpers/default';

describe('AmplitudeLight', () => {
  test('should instantiate amplitude light', async () => {
    const client = new AmplitudeLight();
    await client.init(API_KEY, USER_ID);
    expect(client.config.plugins.length).toEqual(1);
  });
});
