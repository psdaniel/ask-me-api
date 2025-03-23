import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from 'src/resources/dto/create-resource.dto';
import { UpdateResourceDto } from 'src/resources/dto/update-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
  ) {}

  findAll(): Promise<Resource[]> {
    return this.resourcesRepository.find();
  }

  findOne(id: number): Promise<Resource | null> {
    return this.resourcesRepository.findOneBy({ id });
  }

  create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const resource = this.resourcesRepository.create(createResourceDto);
    return this.resourcesRepository.save(resource);
  }

  async update(
    id: number,
    updateResourceDto: UpdateResourceDto,
  ): Promise<Resource | null> {
    await this.resourcesRepository.update(id, updateResourceDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.resourcesRepository.delete(id);
  }
}
