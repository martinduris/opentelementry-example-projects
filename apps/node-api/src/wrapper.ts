import * as api from '@opentelemetry/api';
import { DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector-proto');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { NodeTracerProvider } = require('@opentelemetry/node');
import {
    detectResources,
    envDetector,
    processDetector,
} from '@opentelemetry/resources';
import { NodeTracerConfig } from '@opentelemetry/node';
import { SDKRegistrationConfig } from '@opentelemetry/tracing';
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');

declare global {
  function configureTracer(defaultConfig: NodeTracerConfig): NodeTracerConfig;
  function configureSdkRegistration(
    defaultSdkRegistration: SDKRegistrationConfig
  ): SDKRegistrationConfig;
}

api.diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);
console.log('wrapper: required');

const instrumentations = [
    // Express instrumentation expects HTTP layer to be instrumented
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
];

// api.propagation.setGlobalPropagator(new HttpTraceContextPropagator());

async function initializeProvider() {
    console.log('wrapper: initialization start');
    const resource = await detectResources({
        detectors: [envDetector, processDetector],
    });

    let config: NodeTracerConfig = {
      resource,
    };
    if (typeof configureTracer === 'function') {
      config = configureTracer(config);
    }
    const tracerProvider = new NodeTracerProvider(config);
    tracerProvider.addSpanProcessor(
        // new BatchSpanProcessor(
        new SimpleSpanProcessor( // BatchSpanProcessor
            new CollectorTraceExporter({
                url: 'http://localhost:55681/v1/traces',
                hostname: 'localhost'
            })
        )
    );

    let sdkRegistrationConfig: SDKRegistrationConfig = {};
    if (typeof configureSdkRegistration === 'function') {
      sdkRegistrationConfig = configureSdkRegistration(sdkRegistrationConfig);
    }
    tracerProvider.register(sdkRegistrationConfig);

    registerInstrumentations({
        instrumentations,
        tracerProvider
    });

    console.log('wrapper: initialization done');
}

initializeProvider();
