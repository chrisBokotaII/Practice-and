/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user;
  }

  async findAll() {
    const users = await this.usersRepository.find({
      relations: {
        nftMetadatum: true,
      },
    });
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return usersWithoutPassword;
  }

  async findOnebyemail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }
  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        nftMetadatum: true,
      },
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  async findOneWithPassword(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = Object.assign(user, updateUserDto);
    await this.usersRepository.save(updatedUser);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    await this.usersRepository.remove(user);

    return `This action removes a #${id} user`;
  }
}
