import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  providers: [ResourcesService],
  controllers: [ResourcesController],
})
export class ResourcesModule {}
