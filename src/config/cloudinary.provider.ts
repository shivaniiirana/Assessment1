import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    cloudinary.config({
      cloud_name: "dqervdqfk",
      api_key: "822156387346253",
      api_secret:"wN9aiK7ngezaj16G1KKl4qF4FBU" ,
    });
    return cloudinary;
  },
};
