import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Photo {
    @Prop({ required: true })
    cloudinaryId: string;
  
    @Prop({ required: true })
    cloudinaryUrl: string;
  
    @Prop()
    filename: string;
  
    @Prop()
    size: number;
  
    @Prop()
    format: string;
  
    @Prop()
    width: number;
  
    @Prop()
    height: number;
  
    @Prop()
    caption: string;
  
    @Prop({ required: true })
    userId: string;
}

export type PhotoDocument = Photo & Document;
export const PhotoSchema = SchemaFactory.createForClass(Photo);