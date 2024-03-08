//importamos los Crud de servicios o las funciones básicas de servicios:
import Services from './class.services.js';
//importamos el modelo ProductDao con las nuevas :
import persistence from '../persistence/daos/factory.js';
import { errorsDictionary } from '../utils/errors.dictionary.js';
import { __dirname } from '../utils.js';
import { generateProducts } from '../utils/faker/products.faker.js';



class ProductService extends Services {
    constructor() {
        super(persistence.productDao)
    }

    getAllPaginate = async (
        pageNumber = 1,
        pageSize = 10,
        searchQuery = '',
        sortOrder = {},
        category,
        exist,
        priceFilter
    ) => {
        try {
            //validación de pageNumber y pageSize y seteo default por si no es válido
            if (isNaN(pageNumber) || pageNumber < 1) {
                pageNumber = 1;
            }
            if (isNaN(pageSize) || pageSize < 1) {
                pageSize = 10;
            }
            const buildFilter = (searchQuery, priceFilter, category, exist) => {
                let filter = {};
                if (typeof priceFilter === 'number') {
                    filter['Price'] = priceFilter;
                } else {
                    if (searchQuery !== '') {
                        filter['$or'] = [
                            { 'Title': { $regex: searchQuery, $options: 'i' } },
                            { 'Description': { $regex: searchQuery, $options: 'i' } },
                            { 'Code': { $regex: searchQuery, $options: 'i' } },
                            { 'Category': { $regex: searchQuery, $options: 'i' } }
                        ];
                    }
                }
                if (category) {
                    filter['Category'] = { $regex: category, $options: 'i' };
                }
                if (exist) {
                    if (exist === 'yes') {
                        filter['Stock'] = { $gt: 0 };
                    } else if (exist === 'no') { filter['Stock'] = { $lte: 0 } }
                }
                return filter;
            };
            const buildSortOptions = (sortOrder) => {
                let sortOptions = {};
                if (sortOrder === 'asc' || sortOrder === 'desc') {
                    sortOptions['Price'] = sortOrder === 'asc' ? 1 : -1;
                    //console.log('sortOptions:', sortOptions)
                }
                return sortOptions;
            };
            const filter = buildFilter(searchQuery, priceFilter, category, exist);
            //console.log('consola 4:', filter)
            const sortOptions = buildSortOptions(sortOrder);
            //console.log('consola 5', sortOptions)
            const product = await this.dao.getAllPaginate(pageNumber, pageSize, filter, sortOptions);
            return product
        } catch (error) {
            throw new Error(error.message, errorsDictionary.ERROR_TO_GET);
        }
    };
    getAllSimple = async () => {
        try {
            const products = await this.dao.getAllSimple()
            return products;
        } catch (error) {
            throw new Error(error.message, errorsDictionary.ERROR_TO_GET);
        }
    };
    /**generadores faker */
    createMockingProducts = async (cant) => {
        try {
            console.log(cant)
            const productsArray = [];
            for (let i = 0; i < cant; i++) {
                const product = generateProducts();
                productsArray.push(product);
            }
            //const products = await this.dao.create(productsArray);
            return productsArray;
        } catch (error) {
            throw new Error(error.message, errorsDictionary.ERROR_TO_CREATE);
        }
    }
    getMockingProducts = async (cant) => {
        try {
            const products = await this.createMockingProducts(cant)
            console.log(products)
            return products;
        } catch (error) {
            throw new Error(error.message, errorsDictionary.ERROR_TO_GET);
        }
    }
}

const productService = new ProductService(persistence.productDao);
export default productService;
