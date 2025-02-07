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
          'https://guitar-lessons-px2t.vercel.app',
          'https://guitarlessons-munich.com',
        ],
        credentials: true,
      },
      transports: ['websocket'],
    });
    return server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://guitar-lessons-px2t.vercel.app',
      'https://guitarlessons-munich.com',
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  app.useWebSocketAdapter(new SocketIoAdapter(app));

  // console.log('DATABASE_URL:', process.env.DATABASE_URL);
  // console.log('JWT_SECRET:', process.env.JWT_SECRET);
  // console.log('PORT:', process.env.PORT || 3001);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
