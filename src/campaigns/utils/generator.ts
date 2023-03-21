import { Voucher } from '../entities/voucher.entity';

export const generateVoucherCodes = (
  vouchers: Voucher[],
  amount: number,
  prefix: string,
) => {
  const voucherCodes = getVoucherCodes(vouchers) || [];
  const result = [];
  let generatedVoucherCode = '';
  let count = amount;

  for (let i = 0; i < count; i++) {
    generatedVoucherCode = `${prefix}-${generateVoucherCode()}`;

    if (voucherCodes.indexOf(generatedVoucherCode) < 0)
      result.push(generatedVoucherCode);
    else count += 1;
  }

  return result.map((item) => ({ code: item }));
};

export const generateVoucherCode = () => {
  const length = 6;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const getVoucherCodes = (vouchers: Voucher[]) =>
  vouchers.length > 0 ? vouchers.map((voucher) => voucher.code) : [];
