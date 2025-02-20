import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

// ✅ Setup Swagger
const config = new DocumentBuilder()
.setTitle('Tasks API')
.setDescription('API for managing tasks')
.setVersion('1.0')
.addTag('tasks')
.build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  // ✅ Configure EJS
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('ejs');

  await app.listen(5000);
}
bootstrap();
