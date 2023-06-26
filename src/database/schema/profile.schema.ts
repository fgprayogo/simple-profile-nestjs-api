import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from '../../database/schema/user.schema';
import { InterestCategory } from './interest-category.schema';

enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

enum Horoscope {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Scorpio',
  Sagittarius = 'Sagittarius',
  Capricorn = 'Capricorn',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces',
}

enum Zodiac {
  Rat = 'Rat',
  Ox = 'Ox',
  Tiger = 'Tiger',
  Rabbit = 'Rabbit',
  Dragon = 'Dragon',
  Snake = 'Snake',
  Horse = 'Horse',
  Goat = 'Goat',
  Monkey = 'Monkey',
  Rooster = 'Rooster',
  Dog = 'Dog',
  Pig = 'Pig',
}

enum HeightMeasurementUnit {
  cm = 'cm',
  inch = 'inch',
}

enum WeightMeasurementUnit {
  kg = 'kg',
}

@Schema({ timestamps: true, collection: 'profile' })
export class Profile {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    unique: true,
  })
  user: User;

  @Prop()
  name: string;

  @Prop({ enum: Gender, default: Gender.Other })
  gender: Gender;

  @Prop()
  birthDay: string;

  @Prop({ enum: Horoscope })
  horoscope: Horoscope;

  @Prop({ enum: Zodiac })
  zodiac: Zodiac;

  @Prop()
  height: number;

  @Prop({ enum: HeightMeasurementUnit })
  heightMeasurementUnit: HeightMeasurementUnit;

  @Prop()
  weight: number;

  @Prop({ enum: WeightMeasurementUnit })
  weightMeasurementUnit: WeightMeasurementUnit;

  @Prop()
  profilePicture: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'InterestCategory' }],
  })
  interests: InterestCategory[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
