module.exports = app => {
  const controlador = require("../controladores/controller.js");

  var router = require("express").Router();

  // Cria um novo utilizador
  router.post("/registar", controlador.registar);

  // Rota para login - tem de ser POST para não vir user e pass na URL
  router.post("/login", controlador.login);

  // Inserir um associado à lista de espera
  router.post("/inserirEspera", controlador.inserirEspera);

  // Inserir um pagamento de um evento 
  router.post("/inserirPagamentoEvento", controlador.inserirPagamentoEvento);

  // Apagar evento
  router.put("/editEvento", controlador.EditEvento);

  // Apagar evento
  router.delete("/deleteEvento", controlador.DeleteEvento);

  // Inserir um pagamento de uma quota 
  router.post("/inserirPagamentoQuota", controlador.inserirPagamentoQuota);

  // Inserir um estado dos documentos
  router.post("/inserirStatusDoc", controlador.inserirStatusDoc);

  // Inserir um associado ao agrupamento
  router.post("/insereEscuteiro", controlador.inserirEscuteiro);

  // Lista os eventos
  router.get("/listagemEventos/", controlador.listaEventos);

  // Lista as quotas
  router.get("/listagemQuotas/", controlador.listaQuotas);

  // Lista os associados em lista de espera
  router.get("/listagemEspera/", controlador.listaEspera);

  // Lista o status dos documentos
  router.get("/listagemDocumentos/", controlador.listaDocumentos);

  // Lista os Lobitos
  router.get("/listagemLobitos/", controlador.listaLobitos);

  // Lista os Exploradores
  router.get("/listagemExploradores/", controlador.listaExploradores);

  // Lista os Pioneiros
  router.get("/listagemPioneiros/", controlador.listaPioneiros);
  
  // Lista os Caminheiros
  router.get("/listagemCaminheiros/", controlador.listaCaminheiros);

  // Lista os Secretários
  router.get("/listagemSecretario/", controlador.listaSecretario);


  // router.get("/evento",  controlador.listaEventos)
  // router.post("/evento",  controlador.inserirPagamentoEvento)
  // router.put("/evento",  controlador.EditEvento)
  // router.delete("/evento",  controlador.DeleteEvento)

 
  app.use('/homepage', router);
};
