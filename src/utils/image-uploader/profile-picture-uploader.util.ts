import { BadRequestException, Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';

@Injectable()
export class ProfilePictureUploaderUtil {
  public async upload(profilePicture: any, id: any) {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!allowedMimeTypes.includes(profilePicture.mimetype)) {
      throw new BadRequestException('file must .(png|jpeg|jpg)');
    }

    if (profilePicture.size > 10000000) {
      throw new BadRequestException('file size must bellow 10mb');
    }

    const destinationPath = 'images'; // Specify the directory where you want to save the file
    const fileStream = createWriteStream(`${destinationPath}/${id}.png`);

    fileStream.on('error', (error) => {
      console.error('Error saving file:', error);
      // Handle the error accordingly
    });

    fileStream.on('finish', () => {
      console.log('File saved successfully');
      // Handle the file saved successfully scenario
    });

    // Pipe the file data to the write stream to save it
    fileStream.write(profilePicture.buffer);
    fileStream.end();

    return id;
  }
}
