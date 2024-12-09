// import * as dotenv from 'dotenv';
// dotenv.config();
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as cookieParser from 'cookie-parser';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.use(cookieParser());

//   app.enableCors({
//     origin: [
//       'http://localhost:3000',
//       'https://guitar-lessons-px2t-git-main-darya-petrenkos-projects.vercel.app',
//     ],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   });

//   await app.listen(process.env.PORT || 3001);
// }
// bootstrap();
import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, {
      cors: {
        origin: [
          'http://localhost:3000',
          'https://guitar-lessons-px2t-git-main-darya-petrenkos-projects.vercel.app',
        ],
        credentials: true,
      },
    });
    return server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000', 'https://guitar-lessons-px2t.vercel.app'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  app.useWebSocketAdapter(new SocketIoAdapter(app)); // Установка Socket.io адаптера

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
