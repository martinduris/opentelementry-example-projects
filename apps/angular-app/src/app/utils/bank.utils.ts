/**
 *
 * @param bank TODO should be enum from openapi
 */
export function getLogoForBank(bank: string) {
  return `assets/images/logo/bank/bank_${bank.toLowerCase()}.svg`;
}

/**
 *
 * @param bank TODO should be enum from openapi
 */
export function getTitleForBank(bank: string) {
  switch (bank) {
    case 'WELLS_FARGO':
      return 'Wells Fargo';
    case 'SANTANDER':
      return 'Santander';
    case 'CITY_BANK':
      return 'City Bank';
    default:
      return 'Deutsche Bank'
  }
}
