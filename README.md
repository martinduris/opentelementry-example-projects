# Example Infrastructure watched via OpenTelemetry

### Requirements

- prepared (clean) Elastic stack: ElasticSearch + APM + Kibana
- Running OpenTelemetry collector
- Install Node / NPM / JAVA (11+) / PostgreSQL
- Installed Example Projects


### Build demo

- Install NX ``npm i -g nx``
- Initialize project ``npm i``
- Build angular / node API ``npm i``
- Build JAVA API ``nx run java-api:buildJar``

### Step to start demo

- install project (``npm i``)


- start angular app ``nx run angular-app:serve``
- start node API ``OTEL_SERVICE_NAME=example-security-gateway nx run node-api:serve``
- start java API ``java -javaagent:opentelemetry-javaagent-all.jar -Dotel.resource.attributes=service.name=example-core-api -Dotel.traces.exporter=otlp -jar build/libs/example-projects-0.0.1-SNAPSHOT.jar``
  (can be also run without OpenTelemetry agent ``nx run java-api:serve``)
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

