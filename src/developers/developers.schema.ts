import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DevelopersDocument = Developer & Document;

@Schema()
export class Developer {
  @Prop({ required: true })
  name: string;

  @Prop()
  email?: string;

  @Prop({enum: ['junior', 'senior']})
  level: string;

  @Prop()
  updatedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);
