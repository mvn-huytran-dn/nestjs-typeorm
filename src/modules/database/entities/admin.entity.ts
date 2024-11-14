import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'admins',
})
export class AdminEntity extends BaseEntity {
  @Column({
    nullable: true,
  })
  name: string;

  @Column({})
  @Index({
    unique: true,
  })
  username: string;

  @Column({})
  password: string;
}
