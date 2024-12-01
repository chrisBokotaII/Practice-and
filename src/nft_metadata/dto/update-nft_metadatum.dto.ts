import { PartialType } from '@nestjs/mapped-types';
import { CreateNftMetadatumDto } from './create-nft_metadatum.dto';

export class UpdateNftMetadatumDto extends PartialType(CreateNftMetadatumDto) {}
