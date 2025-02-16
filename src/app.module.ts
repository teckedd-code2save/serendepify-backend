import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CareersModule } from './apis/careers/careers.module';
import { ChatModule } from './apis/chat/chat.module';
import { PeopleModule } from './apis/people/people.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './apis/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
  }),
    CareersModule,
    ProductsModule,
    ChatModule,
    PeopleModule,
    PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
