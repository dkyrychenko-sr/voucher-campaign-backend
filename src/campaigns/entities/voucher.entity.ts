import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Campaign } from './campaign.entity';

@Entity()
export class Voucher {
  @PrimaryColumn({ unique: true })
  code: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.vouchers, {
    onDelete: 'CASCADE',
  })
  campaign: Campaign;
}
