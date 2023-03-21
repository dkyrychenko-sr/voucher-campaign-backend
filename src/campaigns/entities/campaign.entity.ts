import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Voucher } from './voucher.entity';

export enum Currency {
  DOLLAR = 'USD',
}

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Voucher, (voucher) => voucher.campaign, { cascade: true })
  vouchers: Voucher[];

  @Column({ type: 'date' })
  dateFrom: Date;

  @Column({ type: 'date' })
  dateTo: Date;

  @Column()
  amount: number;

  @Column()
  currency: Currency;

  @Column()
  prefix: string;
}
