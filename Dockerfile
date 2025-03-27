FROM node:22

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

COPY package.json /app

RUN pnpm install

COPY . /app

RUN npx prisma generate

EXPOSE 8080

CMD [ "pnpm", "run", "start:dev" ]