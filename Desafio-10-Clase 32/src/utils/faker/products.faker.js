import { faker } from '@faker-js/faker/locale/es';


export const generateProducts = () => {
    return {
        Title: faker.commerce.productName(),
        Description: faker.commerce.productDescription(),
        Code: faker.number.hex({ min: 0, max: 65535 }),
        Price: faker.commerce.price({ min: 1, max: 1000, precision: 0.01 }),
        Stock: faker.number.binary({ min: 0, max: 65535 }),
        Category: faker.commerce.department(),
        Thumbnail: [faker.image.abstract()]
    };
};
