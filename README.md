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




npm run type-check -> Compile nahi karega. Sirf errors batayega.

npm run prisma:generate -> Generate Client

npm run prisma:push -> Development Database Sync

npm run prisma:migrate -> Create Migration Development

npm run prisma:deploy -> Production Migration Render

npm run prisma:studio -> Database GUI (localhost:5555)






