var crypto = require('crypto');

function UsuariosDAO(connection){
    this._connection = connection();
}//end function UsuariosDAO()


UsuariosDAO.prototype.inserirUsuario = function(usuario){
    
    this._connection.open( function(err, mongoclient){
        
        mongoclient.collection("usuarios", function(err, collection){

            var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
            usuario.senha = senha_criptografada;

            collection.insert(usuario);

            mongoclient.close();

        });//end mongoclient.collection("usuarios", function(err, collection)

    });//end this._connection.open( function(err, mongoclient)

}//end UsuariosDAO.prototype.inserirUsuario = function(usuario)


UsuariosDAO.prototype.autenticar = function(usuario, req, res){
  
    this._connection.open( function(err, mongoclient){

        mongoclient.collection("usuarios", function(err, collection){
            
            var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');            
            usuario.senha = senha_criptografada;

            collection.find(usuario).toArray( function(err, result){

                if ( result[0] != undefined ) {
                    req.session.autorizado = true;            
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;

                }

                if ( req.session.autorizado ) {
                    res.redirect('jogo');
                } else {
                    res.render('index', {validacao: {}, dadosForm: {} });
                }
            });

            mongoclient.close();           

        });//end mongoclient.collection("usuarios", function(err, collection)

    });//end this._connection.open( function(err, mongoclient)

}

module.exports = function(){
    return UsuariosDAO;
}//end module.exports = function()