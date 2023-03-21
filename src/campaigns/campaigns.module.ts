import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './entities/campaign.entity';
import { Voucher } from './entities/voucher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, Voucher])],
  controllers: [CampaignsController],
  providers: [CampaignsService],
})
export class CampaignsModule {}
