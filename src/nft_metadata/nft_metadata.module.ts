import { Module } from '@nestjs/common';
import { NftMetadataService } from './nft_metadata.service';
import { NftMetadataController } from './nft_metadata.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftMetadatum } from './entities/nft_metadatum.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([NftMetadatum]), UsersModule],
  controllers: [NftMetadataController],
  providers: [NftMetadataService],
})
export class NftMetadataModule {}
