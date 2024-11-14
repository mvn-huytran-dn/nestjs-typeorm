import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @Column({})
  @Index({
    unique: true,
  })
  phone: string;

  @Index({
    unique: true,
  })
  @Column({})
  email: string;

  @Column({})
  password: string;

  @Column({})
  fullname: string;

  @Column({
    default: 0,
    type: 'int',
  })
  coin: number;

  @Index({ unique: true })
  @Column({
    nullable: true,
    name: 'access_token',
  })
  accessToken: string;

  @Index({ unique: false })
  @Column({
    type: 'date',
    nullable: true,
  })
  birthday: Date;
}
