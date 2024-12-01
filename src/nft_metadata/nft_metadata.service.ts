import { Injectable } from '@nestjs/common';
import { CreateNftMetadatumDto } from './dto/create-nft_metadatum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { NftMetadatum } from './entities/nft_metadatum.entity';

@Injectable()
export class NftMetadataService {
  constructor(
    @InjectRepository(NftMetadatum)
    private readonly nftMetadatumRepository: Repository<NftMetadatum>,
    private readonly userService: UsersService,
  ) {}
  async create(userID: string, createNftMetadatumDto: CreateNftMetadatumDto) {
    const user = await this.userService.findOneWithPassword(userID);
    if (!user) throw new Error('User not found');
    const nftMetadatum = this.nftMetadatumRepository.create(
      createNftMetadatumDto,
    );
    nftMetadatum.user = user;

    await this.nftMetadatumRepository.save(nftMetadatum);
    return {
      id: nftMetadatum.id,
      name: nftMetadatum.name,
      description: nftMetadatum.description,
      image: nftMetadatum.image,
    };
  }

  findOne(id: number) {
    const nftMetadatum = this.nftMetadatumRepository.findOne({ where: { id } });
    return nftMetadatum;
  }
}
