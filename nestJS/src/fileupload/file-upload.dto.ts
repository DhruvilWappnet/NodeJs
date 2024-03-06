import { IsNotEmpty } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty()
  file: any; // This will be replaced with proper file type when using multer
}
