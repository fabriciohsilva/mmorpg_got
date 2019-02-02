//importar mongodb
var mongo = require('mongodb');

var connMongoDB = function(){

    var db = new mongo.Db(
        'got'
    ,   new mongo.Server(
            'localhost' //string com o endereço do servidor bd
        ,   27017 //porta do servidor db
        ,   {}  )
    ,   {}
    );

    return db;

}

module.exports = function(){
    return connMongoDB;
}//end module.exports = function()