import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignatureDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  creation: Date;

  @IsString()
  @IsNotEmpty()
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
}