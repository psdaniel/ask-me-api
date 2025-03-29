import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Answer } from '../answers/entities/answer.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    await this.usersRepository.update(email, updateUserDto);
    return this.findOne(email);
  }

  async remove(email: string): Promise<void> {
    await this.usersRepository.delete(email);
  }

  async getAnswers(email: string): Promise<Answer[]> {
    const user = await this.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.answers;
  }
}
