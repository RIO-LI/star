import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'starcomponent',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
