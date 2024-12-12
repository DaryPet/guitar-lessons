// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { User } from '../../user/entities/user.entity';

// @Entity()
// export class Session {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   userId: number;

//   @ManyToOne(() => User, (user) => user.sessions)
//   user: User;

//   @Column()
//   refreshToken: string;

//   @Column()
//   accessToken: string;

//   @Column()
//   accessTokenValidUntil: Date;

//   @Column()
//   refreshTokenValidUntil: Date;
// }
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sessions, { nullable: false })
  @JoinColumn({ name: 'userId' }) // Указывает, что `userId` — это внешний ключ
  user: User;

  @Column()
  refreshToken: string;

  @Column()
  accessToken: string;

  @Column()
  accessTokenValidUntil: Date;

  @Column()
  refreshTokenValidUntil: Date;
}
