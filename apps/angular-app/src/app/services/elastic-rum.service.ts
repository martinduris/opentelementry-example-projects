import { Injectable } from '@angular/core';

import { init as initApm } from '@elastic/apm-rum';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ElasticRumService {

  constructor() {
    initApm({

      // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
      serviceName: 'example-internet-banking',

      // Set custom APM Server URL (default: http://localhost:8200)
      serverUrl: environment.APM_SERVER,

      // Set the service version (required for source map feature)
      serviceVersion: '1.0.0',

      // Set the service environment

      distributedTracingOrigins: [
        environment.BANK_API_DOMAIN
      ]
    });
  }

}
