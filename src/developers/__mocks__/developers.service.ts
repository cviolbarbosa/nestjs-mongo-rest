import { getMockDeveloper1,getMockDeveloper2, getMockDeveloper3 } from "../test/fixtures/developerStub";


// MOCK SERVICE
export const  DevelopersService = jest.fn().mockReturnValue({
    findAll: jest.fn().mockReturnValue([getMockDeveloper1('junior', true, '1'), getMockDeveloper2('junior', true, '2')]),
    findOne:  jest.fn().mockReturnValue(getMockDeveloper1('junior', true, '1')), 
    create:  jest.fn().mockReturnValue(getMockDeveloper2('junior', true, '2')), 
    update:  jest.fn().mockReturnValue(getMockDeveloper2('junior', true, '2')),
    delete:  jest.fn().mockReturnValue(getMockDeveloper1('junior', true, '1'))
})


