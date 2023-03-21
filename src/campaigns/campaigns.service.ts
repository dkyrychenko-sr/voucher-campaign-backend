import { Injectable, NotFoundException } from '@nestjs/common';
import { Campaign } from './entities/campaign.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { GenerateVouchersDto } from './dto/generate-vouchers.dto';
import { Voucher } from './entities/voucher.entity';
import { generateVoucherCodes } from './utils/generator';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) {}

  findAll() {
    return this.campaignRepository.find({
      relations: {
        vouchers: true,
      },
    });
  }

  findOne(id: string) {
    const campaign = this.campaignRepository.findOne({
      where: { id: +id },
      relations: {
        vouchers: true,
      },
    });
    if (!campaign) {
      throw new NotFoundException(`Campaign #${id} not found`);
    }
    return campaign;
  }

  create(createCampaignDto: CreateCampaignDto) {
    const campaign = this.campaignRepository.create(createCampaignDto);
    return this.campaignRepository.save(campaign);
  }

  async generateVouchers(
    id: string,
    { amountOfNewVouchers }: GenerateVouchersDto,
  ) {
    const campaign = await this.campaignRepository.findOne({
      where: { id: +id },
      relations: {
        vouchers: true,
      },
    });
    const newVouchers = generateVoucherCodes(
      campaign.vouchers || [],
      amountOfNewVouchers,
      campaign.prefix,
    );
    const createdVouchers = this.voucherRepository.create(newVouchers);
    const updatedCampaign = await this.campaignRepository.preload({
      id: +id,
      ...campaign,
      vouchers: campaign.vouchers
        ? [...campaign.vouchers, ...createdVouchers]
        : createdVouchers,
    });
    if (!campaign) {
      throw new NotFoundException(`Campaign #${id} not found`);
    }
    return this.campaignRepository.save(updatedCampaign);
  }

  async remove(id: string) {
    const campaign = await this.findOne(id);
    return this.campaignRepository.remove(campaign);
  }
}
