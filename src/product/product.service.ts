import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO, UpdateProductDTO } from 'src/DTO/product.dto';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll() {
    return this.productModel.find();
  }

  async findOne(id: string) {
    return this.productModel.findById(id);
  }

  create(createdProduct: CreateProductDTO) {
    try {
      const newProduct = new this.productModel(createdProduct);
      return newProduct.save();
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, product: UpdateProductDTO) {
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }

  async delete(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
