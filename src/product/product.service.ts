import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto, ProductDto, UpdateProductDto } from './product.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductService {

  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async getProducts(): Promise<ProductDto[]> {
    const products = await this.productRepository.find();
    return plainToInstance(ProductDto, products, {
      excludeExtraneousValues: true,
    });
  }

  async getProductById(id: number): Promise<ProductDto> {
    const product = await this.productRepository.findOne({ where: { id } });
    if(!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async createProduct(dto: CreateProductDto){
    return await this.productRepository.save(dto);
  }

  async updateProduct(id: number, dto: UpdateProductDto): Promise<ProductDto> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    Object.assign(product, dto);
    const updated = await this.productRepository.save(product);

    return plainToInstance(ProductDto, updated, { excludeExtraneousValues: true });
  }


  async deleteProductById(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return { message: 'Product deleted successfully' };
  }
}
