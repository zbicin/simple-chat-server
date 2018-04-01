# Simple Chat Server

Simple socket.io based chat server that can be used for various workshops.

## Getting started

Clone the repo and install dependencies:
```
git clone git@github.com:zbicin/simple-chat-server.git
cd simple-chat-server
npm install
```

...and run the server:
```
npm start
```

By default the app runs on port 3000. If you wish to change it, use either the `--port` argument: 

```
npm start -- --port 1234
```

or `SIMPLE_CHAT_SERVER_PORT` environmental variable:

```
export SIMPLE_CHAT_SERVER_PORT=1234
npm start
```

## Client development

Use [simple-chat-client-core](https://github.com/zbicin/simple-chat-client-core).
