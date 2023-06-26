import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ProfilePayloadValidatorUtil {
  public async createOrUpdateValidator(body: any) {
    const requiredFields = ['name', 'gender', 'birthDay', 'height', 'weight', 'interests'];

    const bodyObject = JSON.parse(JSON.stringify(body));
    const hasRequiredField = requiredFields.some((field) => bodyObject.hasOwnProperty(field));

    if (!Object.keys(bodyObject).length || !hasRequiredField) {
      throw new BadRequestException(
        'Payload should not be empty and should contain at least one of the following fields: name, gender, birthDay, height, weight, interests, profilePicture',
      );
    }

    if (body.height && !body.heightMeasurementUnit && body.weight && !body.weightMeasurementUnit) {
      throw new BadRequestException('heightMeasurementUnit  & weightMeasurementUnit is required when height & weight is provided');
    }

    if (body.height && !body.heightMeasurementUnit) {
      throw new BadRequestException('heightMeasurementUnit is required when height is provided');
    }

    if (body.weight && !body.weightMeasurementUnit) {
      throw new BadRequestException('weightMeasurementUnit is required when weight is provided');
    }
    return true;
  }
}
