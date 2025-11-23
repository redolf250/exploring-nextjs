import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignatureDto {
  @IsString()
  @IsOptional()
  fullName: string;

  @IsOptional()
  @IsString()
  creation: Date;

  @IsString()
  @IsOptional()
  expiration: Date;

  @IsOptional()
  @IsString()
  privateKey: string;

  @IsOptional()
  @IsString()
  signature: string;

  @IsOptional()
  @IsString()
  publicKey : string;

  @IsOptional()
  @IsNumber()
  amount : number;

  @IsOptional()
  @IsString()
  currency : string;
}