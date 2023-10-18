import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductModule,
    BlogModule,
    MongooseModule.forRoot('mongodb://localhost/hoop-db'),
  ],
})
export class AppModule {}
