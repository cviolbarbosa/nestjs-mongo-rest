import { Developer } from "../../developers.schema";
import { v4 as uuidv4 } from 'uuid';

/**
*   This method create a mock developers.
*   If created is false, it returns only the information fields, not the database-specific fields.
*/
const createMockDev = (level='junior', created=true, id=null): Developer & {_id?:any, createdAt?:any} => {
    const item = {  _id : uuidv4,
                    name: 'Joe Down',
                    email: 'Joe@email.com',
                    level: level,
                    createdAt: new Date()
                };

    if(!created){
        delete item._id;
        delete item.createdAt;
    }

    if (id) {
        item['_id']= id;
    } 
    return item;
};




// MOCK DATA
export const getMockDeveloper1 = (...params) => {
    const item = createMockDev(...params);
    item.name = 'Joe Down';
    item.email = 'Joe@email.com';
    return item;
}

export const getMockDeveloper2 = (...params) => {
    const item = createMockDev(...params);
    item.name = 'Master Mustermann';
    item.email = 'Master@email.com';
    return item;
}

export const getMockDeveloper3 = (...params) => {
    const item = createMockDev(...params);
    item.name = 'Pinco Palino';
    item.email = 'palino@email.com';
    return item;
}
