# Ping Pong

An hybrid development sample using okteto reverse tunnels.

# Application

The Ping Pong application is a nodejs + express application.

It has two services, **ping** and **pong**.

The **ping** service is a public-facing https service.

Its `/ping` endpoint redirects to the **pong** service to check its heath status.

If **pong** is running, **ping** returns the message:

```
"pong" is healthy
```

Otherwise, the following message is returned:

```
"pong" is not running
```

# Deploy the Ping Pong application to Okteto Cloud

Deploy the Ping Pong application in Okteto Cloud by pressing the following button:

[![Develop on Okteto](https://okteto.com/develop-okteto.svg)](https://cloud.okteto.com/deploy?repository=https://github.com/pchico83/ping-pong)

Okteto will run the commands defined in [the okteto pipeline file](/okteto-pipeline.yml). You can deploy your application with any kubernetes tool like `kubectl`, `helm` or `docker compose`.

Once the Ping Pong application is running, access its public endpoint:

   https://ping-[YOUR_GITHUB-ID].cloud.okteto.net/ping

You should get a message like this one:

```
"pong" is not running
```

This is because the **pong** is not running.

Start the **pong** service locally by running the following commands in your local terminal:

```
$ npm install
$ node pong.js
```

# Developing on the Ping service

Before developing on Okteto Cloud, you first need to fetch your namespace Kubernetes credentials:

```
$ okteto login cloud.okteto.com
Authentication will continue in your default browser
You can also open a browser and navigate to the following address:
https://cloud.okteto.com/auth/authorization-code?redirect=http%3A%2F%2F127.0.0.1%3A53437%2Fauthorization-code%2Fcallback%3Fstate%3DjpQPaAZpnkQzKD76izlnyf%2FbR%2BeIv96Gnq2Eaj1tBxY%3D&state=jpQPaAZpnkQzKD76izlnyf%2FbR%2BeIv96Gnq2Eaj1tBxY%3D
 ✓  Logged in as pchico83
    Run `okteto namespace` to switch your context and download your Kubernetes credentials.
```

```
$ okteto namespace
 ✓  Updated context 'cloud_okteto_com' in '/Users/pablo/.kube/config'
 ```

To start developing on the **ping** service run the following command:

```
$ okteto  up
 ✓  Images successfully pulled
 ✓  Files synchronized
    Context:   cloud_okteto_com
    Namespace: pchico83
    Name:      ping
    Forward:   8080 -> 8080
    Reverse:   8081 <- 8081

Welcome to your development container. Happy coding!
pchico83:ping src>
```

In the remote terminal run:

```
pchico83:ping src> node ping
ping listening on http://localhost:8080
```

Refresh the endpoint:

   https://ping-[YOUR_GITHUB-ID].cloud.okteto.net/ping

Now you should get a message like this one:

```
"pong" is healthy
```

This example shows how to develop the **ping** service on a remote development environment while running other services in your local laptop.

# What happened?

The **ping** service is running on the remote cluster and the **pong** service is running in your local laptop.

**ping** is accessing the **pong** service by making a query to localhost:8081. localhost:8081 in the **ping** container is forwarded to your laptop localhost:8081 by using the okteto `reverse` tunnel defined in the [okteto manifest](/okteto.yml).
