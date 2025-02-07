import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { BookingModule } from './booking/booking.module';
import { DocumentModule } from './documents/document.module';
import { CloudinaryConfigService } from './config/cloudinary.config';
import { ChatModule } from './chat/chat.module';

// console.log('Загрузка AppModule');
// console.log('DATABASE_URL:', process.env.DATABASE_URL);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BookingModule,
    UserModule,
    AuthModule,
    TestimonialModule,
    DocumentModule,
    ChatModule,
  ],
  providers: [CloudinaryConfigService],
})
export class AppModule {}
