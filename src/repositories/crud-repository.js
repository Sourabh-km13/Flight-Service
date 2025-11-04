const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
    constructor(model) {
        this.model = model
    }
    create = async (data) => {
        const response = await this.model.create(data);
        return response

    }
    getAll = async () => {

        const response = await this.model.findAll();
        return response

    }
    get = async (id) => {

        const response = await this.model.findByPk(id);
        if (!response) {
            throw new AppError("Not able to find this resource", StatusCodes.NOT_FOUND)
        }
        return response

    }
    destroy = async (id) => {
        const response = await this.model.destroy({
            where:{
                id:id
            }
        })
        if (!response) {
            throw new AppError("Not able to find this resource", StatusCodes.NOT_FOUND)
        }
        return response
    }


}

module.exports = CrudRepository