import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const formattedErrors = errors.reduce((acc, err) => {
        acc[err.property] = Object.values(err.constraints);
        return acc;
      }, {});
      return new BadRequestException({ message: 'Validation failed', errors: formattedErrors });
    },
    stopAtFirstError: true,
  }));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // Access images via /uploads/filename.jpg
  });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  
  const docConfig = new DocumentBuilder()
    .setTitle('WebShop App')
    .addBearerAuth()
    .build()
    SwaggerModule.setup(
      'apidoc',
      app,
      () => SwaggerModule.createDocument(app, docConfig)
    )
    
  
  
  await app.listen(3000);
}
bootstrap();
