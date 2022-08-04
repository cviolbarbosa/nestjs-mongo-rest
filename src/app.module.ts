import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevelopersModule } from './developers/developers.module';
import { MongooseModule } from '@nestjs/mongoose';

const DBHOST = process.env.DBHOST;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

@Module({})
export class AppImportersModule {
    
  static forRoot(ENVIRONMENT: string) : DynamicModule {
        let imports;

        if(ENVIRONMENT === 'production') {
          imports= [DevelopersModule.forRoot('mongo'), MongooseModule.forRoot(`mongodb://${DBHOST}/developers`)];
        }
        if (ENVIRONMENT === 'development') {
          imports= [DevelopersModule.forRoot('memory')];
        }

        return {
                module: AppImportersModule,
                imports: imports,
        }
    }
}




@Module({
  imports: [AppImportersModule.forRoot(ENVIRONMENT)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}