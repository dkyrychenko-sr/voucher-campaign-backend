import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { GenerateVouchersDto } from './dto/generate-vouchers.dto';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCampaignDto) {
    return this.campaignsService.create(body);
  }

  @Post(':id/generate-vouchers')
  generateVouchers(@Param('id') id: string, @Body() body: GenerateVouchersDto) {
    return this.campaignsService.generateVouchers(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id);
  }
}
