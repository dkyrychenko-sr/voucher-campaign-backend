import { IsInt } from 'class-validator';

export class GenerateVouchersDto {
  @IsInt()
  amountOfNewVouchers: number;
}
