# gpt-clone-be

src
│
├── modules
│   │
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │   └── auth.validation.ts
│   │
│   ├── ai-model
│   │   ├── model.controller.ts
│   │   ├── model.service.ts
│   │   ├── model.routes.ts
│   │   ├── model.validation.ts
│   │   └── model.types.ts
│   │
│   ├── project
│   ├── conversation
│   └── message
│
├── config
├── middlewares
├── security
├── utils
├── types
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


