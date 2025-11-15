import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, ProductDto, UpdateProductDto } from './product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<ProductDto[]> {
    return this.productService.getProducts();
  }

  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.getProductById(+id);
  }

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
      return await this.productService.createProduct(dto);
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string ,@Body() dto: UpdateProductDto) {
    return await this.productService.updateProduct(+id, dto);
  }

  @Delete('/:id')
  async deleteProductById(@Param('id') id: string) {
    return await this.productService.deleteProductById(+id);
  }
}
