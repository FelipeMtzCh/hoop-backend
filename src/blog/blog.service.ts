import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDTO, UpdateBlogDTO } from 'src/DTO/blog.dto';
import { Blog } from 'src/schemas/blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  findAll() {
    return this.blogModel.find();
  }

  async findOne(id: string) {
    return this.blogModel.findById(id);
  }

  create(createdProduct: BlogDTO) {
    try {
      const newProduct = new this.blogModel(createdProduct);
      return newProduct.save();
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, product: UpdateBlogDTO) {
    return this.blogModel.findByIdAndUpdate(id, product, { new: true });
  }

  async delete(id: string) {
    return this.blogModel.findByIdAndDelete(id);
  }
}
