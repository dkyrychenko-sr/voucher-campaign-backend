import { Type } from 'class-transformer';
import { IsString, IsInt, IsDate, IsEnum } from 'class-validator';

export enum Currency {
  DOLLAR = 'USD',
}

export class CreateCampaignDto {
  @IsString()
  name: string;
  @Type(() => Date)
  @IsDate()
  dateFrom: Date;
  @Type(() => Date)
  @IsDate()
  dateTo: Date;
  @IsInt()
  amount: number;
  @IsEnum(Currency)
  currency: Currency;
  @IsString()
  prefix: string;
}
