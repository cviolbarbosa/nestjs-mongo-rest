import { Test, TestingModule } from '@nestjs/testing';
import { DevelopersController } from '../developers.controller';
import { CreateDeveloperDTO, UpdateDeveloperDTO } from '../developers.dto';
import { DevelopersService } from '../developers.service';
import { getMockDeveloper1, getMockDeveloper2 } from './fixtures/developerStub';

jest.mock('../developers.service')

describe('DevelopersController', () => {
  let controller: DevelopersController;
  let service: DevelopersService;
  const mock_dev1 = getMockDeveloper1('junior', false, '1');
  const mock_dev2 = getMockDeveloper2('junior', false, '2');


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevelopersController],
      providers: [DevelopersService]
    }).compile();

    controller = module.get<DevelopersController>(DevelopersController);
    service = module.get<DevelopersService>(DevelopersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


// TEST 1
  describe('FIND BY', () => {
    describe('when findById is called with id ', () => {
          let item;
          const id1 = mock_dev1._id;
          beforeEach(async () => 
            item = await controller.findById('1')
          );
          
          test('then it should be call service findall with JSON object', () => {
            expect(service.findOne).toHaveBeenCalledWith(id1);
          });

          test('then it should return the item 1', () => {
            expect(item).toMatchObject(mock_dev1)
          });
    });

  })


// TEST 2
  describe('FIND BY FILTER', () => {

      describe('when findByFilter is called with level filter', () => {
          let items;
          beforeEach(async () => 
            items = await controller.findByFilter('junior')
          );
          
          test('then it should be call service findall with JSON object', () => {
            expect(service.findAll).toHaveBeenCalledWith({level: 'junior'});
          });

          test('then it should return 2 items', () => {
            expect(items).toHaveLength(2);
          });
      });
  });


// TEST 3
  describe('UPDATE', () => {

    describe('when update is called to change the name', () => {
        let updateData: UpdateDeveloperDTO;
        let item;
        const id2 = mock_dev2._id;

        beforeEach(async () => {
          updateData = {name: 'new name'};
          item = await controller.update(id2, updateData);
        });
        
        it('then it should be call service update with JSON object', () => {
          expect(service.update).toHaveBeenCalledWith(id2, {name: 'new name'});
        });

        it('then it should change the property', () => {
          expect(item.name).toEqual(mock_dev2.name);
        })
    });


  });

// TEST 4
describe('CREATE', () => {

  describe('when update is called to change the name', () => {
      let data: CreateDeveloperDTO;
      let item;
      beforeEach(async () => {
        data = {name: 'new name', level:'senior'};
        item = await controller.create(data);
      });
      
      it('then it should be call service create with JSON object', () => {
        expect(service.create).toHaveBeenCalledWith({name: 'new name', level:'senior'});
      });

      it('then it should returned the created item', () => {
        expect(item).toMatchObject(mock_dev2);
      })
  });
});


  afterAll(() => jest.clearAllMocks());

});
