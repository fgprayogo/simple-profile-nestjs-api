import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'interestCategory' })
export class InterestCategory {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;
}

export const InterestCategorySchema = SchemaFactory.createForClass(InterestCategory);
