const mongoose = require('mongoose');

const urlDb = process.env.MONGODB_CNN;
const dbConnection = async()=>{
    try {
       await mongoose.connect(urlDb, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
        //    useCreateIndex: false,
        //    useFindAndModify: false
       });
       console.log('DataBase Online');
    } catch (error) {
        console.log(error);
       throw new Error('Error al inicializar la Db') ;
    }

}


module.exports = {
    dbConnection
}