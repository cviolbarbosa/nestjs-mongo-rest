import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
  } from '@nestjs/common';
import { CreateDeveloperDTO, UpdateDeveloperDTO } from './developers.dto';
import { DevelopersService } from './developers.service';

  
@Controller('developers')
export class DevelopersController {
constructor(private readonly service: DevelopersService) {}
  

    @Get()
    async findByFilter(@Query('level') level: string) {
      const filterObj = level? {level}:{};
      return await this.service.findAll(filterObj);
    }
  
    @Get(':id')
    async findById(@Param('id') id: string) {
      return await this.service.findOne(id);
    }

  
    @Post()
    async create(@Body() createTodoDto: CreateDeveloperDTO) {
      return await this.service.create(createTodoDto);
    }
  
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateTodoDto: UpdateDeveloperDTO) {
      return await this.service.update(id, updateTodoDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.service.delete(id);
    }
}
  