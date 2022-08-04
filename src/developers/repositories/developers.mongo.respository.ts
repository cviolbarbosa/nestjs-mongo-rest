import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Developer, DevelopersDocument } from '../developers.schema';


@Injectable()
export class DevelopersMongoRepository { 
    constructor(@InjectModel(Developer.name) private readonly model: Model<DevelopersDocument>) {}

    async findAll(query: FilterQuery<Developer> = {}): Promise<Developer[]> {
        return await this.model.find(query).exec();
    }
    
    async findOne(id: string): Promise<Developer> {
        return await this.model.findById(id).exec();
    }
    
    async create(createDTO: Partial<Developer>): Promise<Developer> {
        return await new this.model({
          ...createDTO,
          createdAt: new Date(),
        }).save();
    }
    
    async update(id: string, updateDTO:  Partial<Developer>): Promise<Developer> {
        const _update = {...updateDTO, 
                        updatedAt: new Date()}
        return await this.model.findByIdAndUpdate(id, _update, {new:true}).exec();
    }
    
    async delete(id: string): Promise<Developer> {
        return await this.model.findByIdAndDelete(id).exec();
    }


}

