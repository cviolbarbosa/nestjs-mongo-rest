import { Test, TestingModule } from '@nestjs/testing';
import { Developer, DeveloperSchema } from '../developers.schema';
import { DevelopersService } from '../developers.service';
import { DevelopersMemRepository } from '../repositories/developers.mem.respository';
import { DevelopersMongoRepository } from '../repositories/developers.mongo.respository';
import { DevelopersRepositoryModule } from '../repositories/developers.respository.module';
import { getMockDeveloper1, getMockDeveloper2, getMockDeveloper3 } from './fixtures/developerStub';

describe('DevelopersService', () => {
  let service: DevelopersService;
  let repository: DevelopersMemRepository | DevelopersMongoRepository;
  let mock1, mock2, mock3: Developer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevelopersService,
                  DevelopersRepositoryModule,
                  ],
      imports: [DevelopersRepositoryModule.forRoot('memory')]
    }).compile();

    service = module.get<DevelopersService>(DevelopersService);
    repository =  module.get<DevelopersMemRepository>('DevelopersRepository');
    
    // Populate repository for service tests
    mock1 = await repository.create(getMockDeveloper1('senior'));
    mock2 = await repository.create(getMockDeveloper2('senior'));
    mock3 = await repository.create(getMockDeveloper3('junior'));

    jest.clearAllMocks();

  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('FIND ONE', () => {

    describe('when findOne is called', () => {
      let developer: Developer;
      beforeEach(async () => {
        jest.spyOn(repository, 'findOne');
        developer = await service.findOne(mock1._id);
      });

      it('then it should return the developer 1', () =>{
        expect(developer).toEqual(mock1);
      });

    })
  });


  describe('FIND ALL', () => {

    describe('when findAll is called', () => {
      let developers: Developer[];
      beforeEach(async () => {
        jest.spyOn(repository, 'findAll');
        developers = await service.findAll({level:'senior'});
      });

      it('then it should return 2 senior developers', () =>{
        expect(developers).toHaveLength(2);
      });

    })
  });


  describe('UPDATE', () => {

    describe('when update is called', () => {
        let developer: Developer;
        beforeEach(async () => {
          jest.spyOn(repository, 'update');
          developer = await service.update(mock2._id, {level:'junior'});
        });

        it('then it should return a junior developers', () =>{
          expect(developer.level).toEqual('junior');
        });
    })

  });


  describe('CREATE', () => {

    describe('when create is called', () => {
        let developers: Developer[];
        beforeEach(async () => {
          jest.spyOn(repository, 'create');
          await service.create({name:'Fulano', email:'fulano@email.com', level:'junior'});
          developers = await service.findAll({});
        });

        it('then it  findAll should return 4 developers', () =>{
          expect(developers).toHaveLength(4);
        });
    })

  });


});
