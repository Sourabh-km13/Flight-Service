class CrudRepository{
    constructor(model){
        this.model = model
    }
    create =  async(data)=>{
        const response = await this.model.create(data);
        return response

    }
    getAll = async()=>{
        try {
            const response = await this.model.findAll();
            return response
        } catch (error) {
            console.log("Error in creating flight")
            throw error
        }
    }
    get = async(id)=>{
        try {
            const response = await this.model.findByPk(id);
            return response
        } catch (error) {
            console.log("Error in creating flight")
            throw error
        }
    }

    
}

module.exports =  CrudRepository