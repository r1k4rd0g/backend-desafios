import { createResponse } from '../utils.js';

export default class Controllers {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res, next) =>{
        try {
            const items = await this.service.getAll();
            createResponse(res, 200, items)
        } catch (error) {
            next(error.message)
        }
    }

    getById = async (req, res, next)=>{
        try {
            const {id} = req.params;
            const item = await this.service.getById(id);
            if(!item){
                createResponse(res, 404, {
                    method: "getById",
                    error: `Item not found con id: ${id}`
                })
            } else {
                createResponse (res, 200, item)};
        } catch (error) {
            next(error.message)
        }
    }
    create = async (req, res, next)=>{
        try {
            const itemToCreate = req.body
            const newItem = await this.service.create(itemToCreate)
            if(!newItem){createResponse(res, 404, {
                method:"create",
                error:`Error creating the Item ${itemToCreate}`})
            } else{
                createResponse(res, 201, newItem)
            }
        } catch (error) {
            next(error.message)
        }
    }
    update = async (req, res, next)=>{
        try {
            const {id} = req.params;
            const itemToUpdate = req.body;
            const itemSearch = await this.service.getById(id);
            if(!itemSearch){
                createResponse(res, 404, {
                    method:'update',
                    error:`The item whit id: ${id} to be updated does not exist in the database.`});
                } else {
                    const itemUpdated = await this.service.update(id, itemToUpdate);
                    createResponse(res, 200, itemUpdated)
                }
        } catch (error) {
            next(error.message)
        }
    }
    delete = async (req, res, next)=>{
        try {
            const {id} = req.params;
            const itemSearch = await this.service.getById(id);
            if (!itemSearch){
                createResponse(res, 404, {
                    method:'delete',
                    error:`The item with id "${id}" was not found on our records`
                })
            } else{
                const itemDelete = await this.service.delete(id);
                createResponse(res, 200, itemDelete);
            }
        } catch (error) {
            next(error.message)
        }
    }
}