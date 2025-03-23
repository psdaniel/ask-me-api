import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Resource } from './entities/resource.entity';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from 'src/resources/dto/create-resource.dto';
import { UpdateResourceDto } from 'src/resources/dto/update-resource.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  findAll(): Promise<Resource[]> {
    return this.resourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Resource | null> {
    return this.resourcesService.findOne(id);
  }

  @Post()
  create(@Body() createResourceDto: CreateResourceDto): Promise<Resource> {
    return this.resourcesService.create(createResourceDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateResourceDto: UpdateResourceDto,
  ): Promise<Resource | null> {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.resourcesService.delete(id);
  }
}
