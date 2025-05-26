import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';



export const sendImageToCloudinary = (imageName: string, path: string):Promise<Record<string,unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        }
        else if(result){
          resolve(result);
        }
        // delete a file asynchronously
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('File is deleted.');
          }
        });
      },
    );
  });
};

