import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  PrimaryColumn,
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

  @Column({ type: 'timestamp', nullable: true })
  lastInteraction: Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateLastInteraction() {
    const moscowTime = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' }),
    );
    this.lastInteraction = moscowTime;
  }
}
