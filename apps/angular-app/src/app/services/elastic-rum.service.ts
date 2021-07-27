import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ApmBase, init as initApm } from '@elastic/apm-rum';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ElasticRumService implements ErrorHandler {

  apm: ApmBase | undefined;

  constructor() {
    this.apm = initApm({

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

  handleError(err: any) {
    if (this.apm) {
      const error = err.originalError || err;
      if (error instanceof HttpErrorResponse) {
        const message = `${error.status} ${error.url}`;
        this.apm.captureError(message);
      } else if (!(error instanceof HttpErrorResponse) && !(error instanceof Error)) {
        this.apm.captureError(JSON.stringify(error));
      } else {
        this.apm.captureError(error);
      }

      console.error(err);
    }

    throw err;
  }

}
