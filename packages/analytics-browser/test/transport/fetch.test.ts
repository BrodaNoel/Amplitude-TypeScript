import { FetchTransport } from '../../src/transports/fetch';
import 'isomorphic-fetch';

describe('fetch', () => {
  describe('send', () => {
    test('should resolve with response', async () => {
      const transport = new FetchTransport();
      const url = 'http://localhost:3000';
      const payload = {
        api_key: '',
        events: [],
      };
      const result = {
        code: 200,
        events_ingested: 0,
        payload_size_bytes: 0,
        server_upload_time: 0,
      };
      jest.spyOn(window, 'fetch').mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(result))));
      const response = await transport.send(url, payload);
      expect(response).toEqual(result);
    });
  });
});
