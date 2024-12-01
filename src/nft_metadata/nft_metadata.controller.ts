import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NftMetadataService } from './nft_metadata.service';
import { CreateNftMetadatumDto } from './dto/create-nft_metadatum.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('nft-metadata')
export class NftMetadataController {
  constructor(private readonly nftMetadataService: NftMetadataService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createNftMetadatumDto: CreateNftMetadatumDto, @Request() req) {
    return this.nftMetadataService.create(req.user.sub, createNftMetadatumDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nftMetadataService.findOne(+id);
  }
}
