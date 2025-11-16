import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { Product } from '../entities/product.entity';

export class ProductDto {
  @Expose()
  skuCode: string;

  @Expose()
  productName: string;

  @Expose()
  quantity: number;

  @Expose()
  unitPrice: number;
}

export class CreateProductDto {

  @IsNotEmpty({message:"SkuCode is required"})
  @IsString({})
  @MaxLength(10)
  skuCode: string;

  @IsNotEmpty({message:"Product name is required"})
  @IsString()
  productName: string;

  @IsNotEmpty({message: "Quantity is required"})
  @IsNumber({allowNaN: false, maxDecimalPlaces: 0})
  quantity: number;

  @IsNotEmpty({message: "Unit price is required"})
  @IsNumber({allowNaN: false, maxDecimalPlaces: 2})
  unitPrice: number;
}

export class UpdateProductDto {

  @IsNotEmpty({message:"Product name is required"})
  @IsString()
  productName: string;

  @IsNotEmpty({message: "Quantity is required"})
  @IsNumber({allowNaN: false, maxDecimalPlaces: 0})
  quantity: number;

  @IsNotEmpty({message: "Unit price is required"})
  @IsNumber({allowNaN: false, maxDecimalPlaces: 2})
  unitPrice: number;
}

export const mapProductToDto = (p: Product): ProductDto => {
  return {
    productName: p.productName,
    unitPrice: p.unitPrice,
    quantity: p.quantity,
    skuCode: p.skuCode,
  };
};