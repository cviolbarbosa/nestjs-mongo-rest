import { DynamicModule, Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersController } from './developers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Developer, DeveloperSchema } from './developers.schema';
import { DevelopersRepositoryModule } from './repositories/developers.respository.module';
import { DevelopersMongoRepository } from './repositories/developers.mongo.respository';
import { DevelopersMemRepository } from './repositories/developers.mem.respository';

// @Module({
//   providers: [DevelopersService, DevelopersMongoRepository, DevelopersMemRepository],
//   controllers: [DevelopersController],
//   imports: [DevelopersRepositoryModule.forRoot('mongo'),
//             MongooseModule.forFeature([{ name: Developer.name, schema: DeveloperSchema }]),
//   ],
// })
// export class DevelopersModule {}


@Module({})
export class DevelopersModule {
    
    static forRoot (dbSource: string) : DynamicModule {
        return {
                module: DevelopersModule,
                providers: [DevelopersService, DevelopersRepositoryModule],
                controllers: [DevelopersController],
                imports: [DevelopersRepositoryModule.forRoot(dbSource)
          ],
        }
    }
}