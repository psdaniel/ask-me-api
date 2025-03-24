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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all resources' })
  @ApiResponse({
    status: 200,
    description: 'Return all resources',
    type: [Resource],
  })
  findAll(): Promise<Resource[]> {
    return this.resourcesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a resource by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return a resource by ID',
    type: Resource,
  })
  findOne(@Param('id') id: number): Promise<Resource | null> {
    return this.resourcesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new resource' })
  @ApiResponse({
    status: 201,
    description: 'Resource created successfully',
    type: Resource,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createResourceDto: CreateResourceDto): Promise<Resource> {
    return this.resourcesService.create(createResourceDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a resource' })
  @ApiResponse({
    status: 200,
    description: 'Resource updated successfully',
    type: Resource,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(
    @Param('id') id: number,
    @Body() updateResourceDto: UpdateResourceDto,
  ): Promise<Resource | null> {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a resource' })
  @ApiResponse({
    status: 200,
    description: 'Resource deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  remove(@Param('id') id: number): Promise<void> {
    return this.resourcesService.delete(id);
  }
}
