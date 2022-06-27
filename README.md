# `Chat application`

This PoC is being developed as part of a study case of myself.
The technologies are being used here are part of a modern and actual stack.

- NodeJS
- MongoDB
- GraphQL
- Redis
- Socket.io
- ReactJS

--- 
## `Milestones:`

- [x] Scaffolding the project
- [x] Creating user-service with basic user functionalities
- [x] Creating conversation-service with basic chat functionalities
- [ ] Creating a chat-frontend solution to support chat funcionalities
- [ ] Adding Socket.io for message communication 
- [ ] Adding Redis for caching
- [ ] Dockerize application
- [ ] Getting ready for make it deployable to AWS

---
## `How to run the application?`

You must download this repository and install its dependencies. Right after that, you are able to start services by following the commands below:

```Javascript
npm run build:all
npm run start:dev:all
```

For running a standalone service, we just pass the service name as parameter:
```Javascript
npm run start:dev user-service
npm run start:dev conversation-service
```


```Javascript
npm run build // builds the service into /dist folder.
npm run start:dev  // starts the server with --watch parameter (hot reload).
```

You can also run test cases by using the following commands:

```Javascript
npm run test:integration:all
```