/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsString, isArray } from 'class-validator';

@Schema({ timestamps: true })
export class Blog {
  @Prop({
    required: true,
    trim: true,
  })
  @IsString()
  title: string;

  @Prop({
    requiered: true,
    trim: true,
  })
  @IsString()
  content: string;

  @Prop({
    default: 'No images',
  })
  @IsArray()
  imagesURL: string[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
