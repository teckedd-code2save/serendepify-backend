import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
  .setTitle('Algorizz Web API')
  .setDescription('Backend API for Algorizz Web Application')
  .setVersion('1.0')
  .addTag('Alrorizz Backend API')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('algorizz/api', app, documentFactory);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  
}
bootstrap();
