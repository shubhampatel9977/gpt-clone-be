# gpt-clone-be

src
│
├── config
│   ├── env.ts
│   ├── cors.ts
│   └── prisma.ts
│
├── controllers
│   ├── ai.controller.ts
│   └── auth.controller.ts
│
├── services
│   ├── openrouter.service.ts
│   └── auth.service.ts
│
├── routes
│   ├── ai.routes.ts
│   └── auth.routes.ts
│
├── middlewares
│   ├── auth.middleware.ts
│   ├── rateLimiter.ts
│   └── error.middleware.ts
│
├── utils
│   ├── apiResponse.ts
│   ├── jwt.ts
│   └── cookies.ts
│
├── validators
│   ├── auth.validator.ts
│   └── ai.validator.ts
│
├── types
│   ├── auth.types.ts
│   └── common.types.ts
│
├── app.ts
└── server.ts



Prisma -> 

npx prisma generate

npx prisma migrate dev --name init_auth

npx prisma migrate status


Steps ->

npx prisma format

npx prisma generate

npx prisma db push


