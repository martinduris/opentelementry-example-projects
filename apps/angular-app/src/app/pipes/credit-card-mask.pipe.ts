import { Pipe, PipeTransform } from '@angular/core';

/**
 * Format (mask) account, every 4 character put space
 */
@Pipe({name: 'creditCardMask'})
export class CreditCardMaskPipe implements PipeTransform {

  transform(plainCreditCard: string): string {
    const splicedBy4Digits = plainCreditCard.match(/.{1,4}/g);
    return splicedBy4Digits ? splicedBy4Digits.join(' ') : '';
  }

}
