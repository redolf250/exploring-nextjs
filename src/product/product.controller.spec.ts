import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;
  let productsService: ProductService;

  const mockProducts = [
    {
      "skuCode": "PD-1009",
      "productName": "Omen Laptop",
      "quantity": 90,
      "unitPrice": 9000
    },
    {
      "skuCode": "PD-1006",
      "productName": "Game Pad",
      "quantity": 100,
      "unitPrice": 100
    }
  ]

  const mockProductService = {
    getProducts: jest.fn().mockResolvedValue(mockProducts),
    getProductById: jest.fn(),
    createProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productsService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of products', async () => {
    const result = await controller.getProducts();
    expect(result).toEqual(mockProducts);
    expect(productsService.getProducts).toHaveBeenCalled();
  });

  it('should return an array of products with the correct length', async () => {
    const result = await controller.getProducts();
    expect(result.length).toBe(2);  // result contains 2 products
    expect(productsService.getProducts).toHaveBeenCalled();
  });

  it('should throw not found error', async () => {
    jest.spyOn(productsService, 'getProductById')
      .mockRejectedValue(new NotFoundException('Product with id 5 not found'));
    await expect(controller.getProductById(5))
      .rejects
      .toThrow(NotFoundException);
    expect(productsService.getProductById).toHaveBeenCalledWith(5);
  });

  it('should throw duplicate key error when skuCode already exists', async () => {
    jest.spyOn(productsService, 'createProduct')
      .mockRejectedValue(new ConflictException('Duplicate SKU'));
    await expect(
      controller.createProduct({ ...mockProducts[0] })
    ).rejects.toThrow(ConflictException);
    expect(productsService.createProduct).toHaveBeenCalledWith({ ...mockProducts[0]});
  });

  it('should return a product with the given id', async () => {
    const result = await controller.getProductById(2);
    expect(result).toEqual(mockProducts[2]);
    expect(productsService.getProductById).toHaveBeenCalledWith(2);
  });


});
