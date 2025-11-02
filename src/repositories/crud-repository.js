class CrudRepository{
    constructor(model){
        this.model = model
    }
    create =  async(data)=>{
        console.log(this.model);
        
        try {
            const response = await this.model.create(data);
            return response
        } catch (error) {
            console.log("Error in creating flight",error)
            throw error
        }

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