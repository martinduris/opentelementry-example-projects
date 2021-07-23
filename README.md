# Example Infrastructure watched via OpenTelemetry

### Requirements

- prepared (clean) Elastic stack: ElasticSearch + APM + Kibana
- Running OpenTelemetry collector
- Installed Example Projects

### Step to start demo

- install project (``npm i``)


- start angular app ``nx run angular-app:serve``
- start node API ``OTEL_SERVICE_NAME=example-middleware-node-api nx run node-api:serve``
- start local OpenTelemetry collector
- start ElasticSearch / Kibana / APM

### How to run local OpenTelemetry collector

- ``export GOROOT=/opt/repo/opentelemetry/go``
- ``export PATH=$GOROOT/bin:$PATH``
- ``export PATH=$PATH:$(go env GOPATH)/bin``
- ``./bin/otelcol_$(go env GOOS)_$(go env GOARCH) --config ./examples/local/lambda-config.yaml;``


### How to configure/build OpenTelemetry collector

**TODO**

### NGrok

To enable hosted applications (not localhost, for example lambda) to be able to send data to locally stared OpenTelemetry collector can be used ``ngrok``.

- download ngrok
- start ngrok ``./ngrok tcp 8200``

**TODO: configure lambda**

