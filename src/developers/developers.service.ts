import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateDeveloperDTO, UpdateDeveloperDTO } from './developers.dto';
import { Developer } from './developers.schema';
import { DevelopersMongoRepository } from './repositories/developers.mongo.respository';


@Injectable()
export class DevelopersService { 
    constructor(@Inject('DevelopersRepository') private repository: DevelopersMongoRepository ) { }

    async findAll(query: FilterQuery<Developer> = {}): Promise<Developer[]> {
        return this.repository.findAll(query);
    }
    
    async findOne(id: string): Promise<Developer> {
        return this.repository.findOne(id);
    }
    
    async create(createDTO: CreateDeveloperDTO): Promise<Developer> {
        return this.repository.create(createDTO);
    }
    
    async update(id: string, updateDTO: UpdateDeveloperDTO): Promise<Developer> {
        return this.repository.update(id, updateDTO);
    }
    
    async delete(id: string): Promise<Developer> {
        return this.repository.delete(id);
    }
}

