import { BaseDestination } from '@amplitude/analytics-core';
import { BrowserOptions } from '@amplitude/analytics-types';
import { BaseBrowser } from './browser-client';

export class AmplitudeLight extends BaseBrowser {
  async init(apiKey: string, userId?: string, options?: BrowserOptions) {
    await super.init(apiKey, userId, options);
    await this.add(new BaseDestination());
  }
}
