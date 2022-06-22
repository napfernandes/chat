# `Conversation Service`

Service responsible for managing and providing chat data. With this service, users are able to chat with each other and joining conversation rooms.

In order to run this service, you can simply nagivate to its folder (`packages/conversation-service`) and, based on `package.json` commands, start it.

```Javascript
npm run build // builds the service into /dist folder.
npm run start:dev  // starts the server with --watch parameter (hot reload).
```

You can also run test cases by using the following commands:

```Javascript
npm run test:integration // runs integration tests within the given folder.
npm run test:coverage // check the code coverage with current tests.
```