import { IsString } from 'class-validator';

export class CreateNftMetadatumDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  image: string;
}
