module.exports = app => {
  const controlador = require("../controladores/controller.js");

  var router = require("express").Router();

  // // Cria um novo registo
  // router.post("/disciplinas/", controlador.create);

  // Cria um novo utilizador
  router.post("/registar", controlador.registar);

  // Rota para login - tem de ser POST para não vir user e pass na URL
  router.post("/login", controlador.login);

  // Inserir um associado à lista de espera
  router.post("/inserirEspera", controlador.inserirEspera);

  // Lista os associados em lista de espera
  router.get("/listagemEspera/", controlador.findAllListaEspera);

  // Lista os associados da secção Lobitos
  router.get("/listagemLobitos/", controlador.listaLobitos);

  // Lista os associados da secção Exploradores
  router.get("/listagemExploradores/", controlador.findAllExploradores);

  // Lista os associados da secção Pioneiros
  router.get("/listagemPioneiros/", controlador.findAllPioneiros);

  // Lista os associados da secção Caminheiros
  router.get("/listagemCaminheiros/", controlador.findAllCaminheiros);

  // // Inserir um associado ao agrupamento
  // router.post("/insereEscuteiro", controlador.inserirEscuteiro);


  // // Busca todas as disciplinas com uma chave de pesquisa
  // router.get("/disciplinas/key/:id", controlador.findKey);

  // // Update a Tutorial with id
  // router.put("/disciplinas/:id", controlador.update);

  // // Delete a Tutorial with id
  // router.delete("/disciplinas/:id", controlador.delete);

  // // Create a new Tutorial
  // router.delete("/disciplinas", controlador.deleteAll);

  // // Busca todas as disciplinas com uma chave de pesquisa
  // router.get("/disciplinas/key/:id", controlador.findKey);
 
  app.use('/homepage', router);
};
