import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductService', () => {
  let service: ProductService;
  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: getRepositoryToken(Product), useValue: mockRepo }
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of products with the correct length', async () => {
    mockRepo.find.mockResolvedValue([
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ]);
    const result = await service.getProducts();
    expect(result.length).toBe(2);
    expect(mockRepo.find).toHaveBeenCalled();
  });

  it('should return a product with the given id', async () => {
    mockRepo.findOne.mockResolvedValue({
      "skuCode": "PD-1009",
      "productName": "Omen Laptop",
      "quantity": 90,
      "unitPrice": "9000.00"
    });
    const result = await service.getProductById(1);
    expect(result).toEqual({
      "skuCode": "PD-1009",
      "productName": "Omen Laptop",
      "quantity": 90,
      "unitPrice": "9000.00"
    });
    expect(mockRepo.findOne).toHaveBeenCalled();
  });

});
