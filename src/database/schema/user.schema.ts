import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Profile } from '../../database/schema/profile.schema';

@Schema({ timestamps: true, collection: 'user' })
export class User {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true, unique: true})
  email: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Profile',
  })
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
