import { DynamicModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Developer, DeveloperSchema } from "../developers.schema";
import { DevelopersMemRepository } from "./developers.mem.respository";
import { DevelopersMongoRepository } from "./developers.mongo.respository";


@Module({})
export class DevelopersRepositoryModule {
    
    static forRoot (dbSource: string) : DynamicModule {
        let providers, imports;
        if (dbSource === 'mongo') {
                providers =   [{provide: 'DevelopersRepository',
                                useClass: DevelopersMongoRepository}
                              ];
                imports = [MongooseModule.forFeature([{ name: Developer.name, schema: DeveloperSchema }])];
 
        }
        if (dbSource === 'memory') {
                providers =   [{provide: 'DevelopersRepository',
                                useClass: DevelopersMemRepository}
                              ];
                imports = [];
        }


        return {    module: DevelopersRepositoryModule,
                    imports: imports,
                    providers: providers,
                    exports: providers,
                    global: true
                
            }
    }
}