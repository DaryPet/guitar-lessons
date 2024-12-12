import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

<<<<<<< HEAD
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.sessions)
=======
  @ManyToOne(() => User, (user) => user.sessions, { nullable: false })
  @JoinColumn({ name: 'userId' }) // Указывает, что `userId` — это внешний ключ
>>>>>>> parent of 7b2c2b7 (1)
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
