import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from 'src/DTO/product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.findAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const productFound = await this.productService.findOne(id);
    if (!productFound) throw new NotFoundException('Product not found');
    return productFound;
  }

  @Post()
  async createProduct(@Body() body: CreateProductDTO) {
    try {
      return await this.productService.create(body);
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException('Task already exists');
      throw error;
    }
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDTO) {
    const updatedProduct = await this.productService.update(id, body);
    if (!updatedProduct) throw new NotFoundException('Product not found');
    return updatedProduct;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: string) {
    const productFound = await this.productService.delete(id);
    if (!productFound) throw new NotFoundException('Product not found');
    return productFound;
  }
}
