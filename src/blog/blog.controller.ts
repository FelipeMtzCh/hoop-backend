import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDTO, UpdateBlogDTO } from 'src/DTO/blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  getAllPosts() {
    return this.blogService.findAll();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const postFound = await this.blogService.findOne(id);
    if (!postFound) throw new NotFoundException('Post not found');
    return postFound;
  }

  @Post()
  async createPost(@Body() body: BlogDTO) {
    try {
      return await this.blogService.create(body);
    } catch (error) {
      console.log(error);
      return HttpStatus.BAD_REQUEST;
    }
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() body: UpdateBlogDTO) {
    const updatedPost = await this.blogService.update(id, body);
    if (!updatedPost) throw new NotFoundException('Post not found');
    return HttpStatus.OK;
  }

  @Delete(':id')
  @HttpCode(204)
  async deletePost(@Param('id') id: string) {
    const postFound = await this.blogService.delete(id);
    if (!postFound) throw new NotFoundException('POst not found');
    return HttpStatus.OK;
  }
}
