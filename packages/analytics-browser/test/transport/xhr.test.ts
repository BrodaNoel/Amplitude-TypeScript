import { XHRTransport } from '../../src/transports/xhr';

describe('xhr', () => {
  describe('send', () => {
    test('should resolve with response', async () => {
      const transport = new XHRTransport();
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
      const xhr = new XMLHttpRequest();
      const open = jest.fn();
      const setRequestHeader = jest.fn();
      const send = jest.fn();
      const mock = {
        ...xhr,
        open,
        setRequestHeader,
        send,
        readyState: 4,
        responseText: JSON.stringify(result),
      };
      jest.spyOn(window, 'XMLHttpRequest').mockReturnValueOnce(mock);

      const unresolvedResponse = transport.send(url, payload);
      expect(mock.onreadystatechange).toBeDefined();
      mock.onreadystatechange && mock.onreadystatechange(new Event(''));
      const response = await unresolvedResponse;
      expect(response).toEqual(result);
      expect(open).toHaveBeenCalledWith('POST', url, true);
      expect(setRequestHeader).toHaveBeenCalledTimes(2);
      expect(send).toHaveBeenCalledTimes(1);
      expect(send).toHaveBeenCalledWith(JSON.stringify(payload));
    });

    test('should handle unexpected error', async () => {
      const transport = new XHRTransport();
      const url = 'http://localhost:3000';
      const payload = {
        api_key: '',
        events: [],
      };
      const xhr = new XMLHttpRequest();
      const open = jest.fn();
      const setRequestHeader = jest.fn();
      const send = jest.fn();
      const mock = {
        ...xhr,
        open,
        setRequestHeader,
        send,
        readyState: 4,
        responseText: '',
      };
      jest.spyOn(window, 'XMLHttpRequest').mockReturnValueOnce(mock);

      const unresolvedResponse = transport.send(url, payload);
      expect(mock.onreadystatechange).toBeDefined();
      mock.onreadystatechange && mock.onreadystatechange(new Event(''));
      await expect(unresolvedResponse).rejects.toThrow('Unexpected end of JSON input');
      expect(open).toHaveBeenCalledWith('POST', url, true);
      expect(setRequestHeader).toHaveBeenCalledTimes(2);
      expect(send).toHaveBeenCalledTimes(1);
      expect(send).toHaveBeenCalledWith(JSON.stringify(payload));
    });
  });
});
