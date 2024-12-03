/**
 * This class represents a token request
 * @class TokenRequest
 * @property {string} establishment_number - The establishment number
 * @property {CardData} card_data - The card data
 */

import { IsNotEmpty, IsString } from 'class-validator';

export class CardData {
  @IsNotEmpty()
  @IsString()
  card_number: string;

  @IsNotEmpty()
  @IsString()
  expiration_date: string;

  @IsNotEmpty()
  @IsString()
  card_holder: string;

  @IsNotEmpty()
  @IsString()
  security_code: string;

  @IsNotEmpty()
  @IsString()
  account_number: string;

  @IsNotEmpty()
  @IsString()
  email_holder: string;
}

export class TokenRequest {
  @IsNotEmpty()
  establishment_number: string;

  @IsNotEmpty()
  card_data: CardData;
}
