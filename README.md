
## Description
Backend project for autonomy software solutions company website

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Development
### Quickly Scaffold controllers,services and modules
- `nest g module name`
- `nest g service name`
- `nest g resource name`
- `nest g controller name`
### Prisma Set
- Generate Prisma client
- Update Schema and define models
- Migrate db `npx prisma migrate dev --name init`

### Seed data
- Create seeding file at the root `touch prisma/seed.ts`
- Add new script entry to package.json `"scripts": {"seed": "ts-node prisma/seed.ts"}`
- `npm run seed` or `pnpm run seed` if pnpm is your package manager
- `npx prisma studio`

### Api Documentation
- Install Swagger
- `pnpm install --save @nestjs/swagger`
## Deployment

[deployment documentation](https://docs.nestjs.com/deployment) 

 check out [Mau](https://mau.nestjs.com)

```bash
$ pnpm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Stack
### Database
- Redis
- Postgres

### Protocols
- REST
- GraphQl
- WebSockets

### Languages
- Js(TypeScript)

### ORM 
- Prisma

