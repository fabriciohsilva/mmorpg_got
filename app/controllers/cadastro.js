module.exports.cadastro = function(application, req, res){
    res.render('cadastro', {validacao: {}, dadosForm: {} });
};//end module.exports.cadastro = function(application, req, res)

module.exports.cadastrar = function(application, req, res){
    
    var dadosForm = req.body;

    req.assert('nome',    'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha',   'Senha não pode ser vazio').notEmpty();
    req.assert('casa',    'Casa não pode ser vazio').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
        return;
    }

    var connection = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    var JogoDAO = new application.app.models.JogoDAO(connection);
    
    //geração do usuário
    UsuariosDAO.inserirUsuario(dadosForm);

    //geração dos parâmetros
    JogoDAO.gerarParametros(dadosForm.usuario);

    res.render('sucesso');

};//end module.exports.cadastro = function(application, req, res)

module.exports.sucesso = function(application, req, res){
    res.render('sucesso');
};//end module.exports.cadastro = function(application, req, res)