import {
  Column,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'contacts' })
export class ContactEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @UpdateDateColumn({ nullable: true })
  lastInteraction: Date;
}
