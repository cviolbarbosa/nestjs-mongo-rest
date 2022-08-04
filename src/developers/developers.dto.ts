import {IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';

enum LevelOptions {
    junior = 'junior',
    senior = 'senior'
};


export class CreateDeveloperDTO {
    @IsString()
    name: string;

    @IsEmail()
    email?: string;

    @IsEnum(LevelOptions, { each: true })
    level: string;
}
    
export class UpdateDeveloperDTO {
    @IsString()
    name?: string;

    @IsEmail()
    email?: string;

    @IsEnum(LevelOptions, { each: true })
    level?: string;
}
