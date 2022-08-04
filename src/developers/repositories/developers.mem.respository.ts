import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { Developer } from '../developers.schema';
import * as query from 'array-simple-query';
import { v4 as uuidv4 } from 'uuid';
import { CreateDeveloperDTO } from '../developers.dto';

@Injectable()
export class DevelopersMemRepository {
    public data: Developer[];
    
    constructor() {
        this.data = [];
    }

    async findAll(queryObj: FilterQuery<Developer> = {}): Promise<Developer[]> {
        return await Promise.resolve(query.filterObjects(this.data, queryObj));
    }
    
    async findOne(id: string): Promise<Developer> {
        return await Promise.resolve(query.getObject(this.data, {_id: id}));
    }
    
    async create(createDTO: CreateDeveloperDTO): Promise<Developer> {
        const newItem = {
            ...createDTO,
            _id: uuidv4(),
            createdAt: new Date(),
          };

        this.data.push(newItem);
        return await Promise.resolve(newItem);
    }
    
    async update(id: string, updateDTO:  Partial<Developer>): Promise<Developer> {
        const _update = {...updateDTO, 
                        updatedAt: new Date()};
        const updatedItem = query.getObject(this.data, {_id: id});
        Object.assign(updatedItem, _update);
        return await Promise.resolve(updatedItem);
    }
    
    async delete(id: string): Promise<Developer> {
        const deletedItem = query.getObject(this.data, {_id: id});
        query.deleteObjects(this.data, {_id: id})
        return await Promise.resolve(deletedItem);
    }


}

