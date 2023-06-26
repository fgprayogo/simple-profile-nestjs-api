import { User } from '../../../../database/schema/user.schema';

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


export const createdUserStub = (): User => {
  return {
    _id: "649875e18b85ff8130caee7e",
    email: 'a@gmail.com',
    userName: 'g',
    password: 'e70ffe4d0497d184',
    profile: null,
  };
};

export const updatedUserStub = (): User => {
  return {
    _id: '649875e18b85ff8130caee7e',
    email: 'jack@example.com',
    userName: 'jack',
    password: 'asjdaksdd',
    profile: {
      _id: '569875e18b85ff8130caee7e',
      user: new User(),
      name: 'jack the ripper',
      gender: Gender.Male,
      birthDay: '1999-11-20',
      horoscope: Horoscope.Aries,
      zodiac: Zodiac.Rat,
      height: 170,
      heightMeasurementUnit: HeightMeasurementUnit.cm,
      weight: 80,
      weightMeasurementUnit: WeightMeasurementUnit.kg,
      profilePicture: '',
      interests: [],
    },
  };
};
