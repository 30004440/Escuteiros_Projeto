module.exports = app => {
  const controlador = require("../controladores/controller.js");

  var router = require("express").Router();

  // Cria um novo utilizador
  router.post("/registar", controlador.registar);

  // Rota para login - tem de ser POST para não vir user e pass na URL
  router.post("/login", controlador.login);

///////////////////////////////////////////////////////////////////////////////////
  // Inserir um pagamento de um evento 
  router.post("/inserirPagamentoEvento", controlador.inserirPagamentoEvento);

  // Lista os eventos
  router.get("/listagemEventos/", controlador.listaEventos);

  // Editar evento
  router.put("/editEvento", controlador.EditEvento);
  
  // Apagar evento
  router.delete("/deleteEvento", controlador.DeleteEvento);

///////////////////////////////////////////////////////////////////////////////////
  // Inserir um pagamento de uma quota 
  router.post("/inserirPagamentoQuota", controlador.inserirPagamentoQuota);

  // Lista as quotas
  router.get("/listagemQuotas/", controlador.listaQuotas);

  // Editar quota
  router.put("/editQuota", controlador.EditQuota);

  // Apagar quota
  router.delete("/deleteQuota", controlador.DeleteQuota);

///////////////////////////////////////////////////////////////////////////////////
  // Inserir um associado à lista de espera
  router.post("/inserirEspera", controlador.inserirEspera);

  // Lista os associados em lista de espera
  router.get("/listagemEspera/", controlador.listaEspera);

  // Editar Espera
  router.put("/editEspera", controlador.EditEspera);

  // Apagar Espera
  router.delete("/deleteEspera", controlador.DeleteEspera);

///////////////////////////////////////////////////////////////////////////////////
  // Inserir um estado dos documentos
  router.post("/inserirStatusDoc", controlador.inserirStatusDoc);

  // Lista o status dos documentos
  router.get("/listagemDocumentos/", controlador.listaDocumentos);

  // Editar Documento
  router.put("/editDocumento", controlador.EditDocumento);

  // Apagar Documento
  router.delete("/deleteDocumento", controlador.DeleteDocumento);

///////////////////////////////////////////////////////////////////////////////////
  // Inserir um associado ao agrupamento
  router.post("/insereEscuteiro", controlador.inserirEscuteiro);


  // Lista os Lobitos
  router.get("/listagemLobitos/", controlador.listaLobitos);

  // // Editar Lobito
  // router.put("/editLobito", controlador.editLobito);

  // // Apagar Lobito
  // router.delete("/deleteLobito", controlador.DeleteLobito);

  // Lista os Explorador
  router.get("/listagemExploradores/", controlador.listaExploradores);

  // // Editar Explorador
  // router.put("/editExplorador", controlador.editExplorador);

  // // Apagar Explorador
  // router.delete("/deleteExplorador", controlador.DeleteExplorador);
  
  // Lista os Pioneiros
  router.get("/listagemPioneiros/", controlador.listaPioneiros);

  // // Editar Pioneiro
  // router.put("/editPioneiro", controlador.editPioneiro);

  // // Apagar Pioneiro
  // router.delete("/deletePioneiro", controlador.DeletePioneiro);
    
  // Lista os Caminheiros
  router.get("/listagemCaminheiros/", controlador.listaCaminheiros);

  // // Editar Caminheiro
  // router.put("/editCaminheiro", controlador.editCaminheiro);

  // // Apagar Caminheiro
  // router.delete("/deleteCaminheiro", controlador.DeleteCaminheiro);


///////////////////////////////////////////////////////////////////////////////////
  // Lista os Secretários
  router.get("/listagemSecretario/", controlador.listaSecretario);

  // Editar Secretário
  router.put("/editSecretario", controlador.editSecretario);

  // Apagar Secretário
  router.delete("/deleteSecretario", controlador.DeleteSecretario);


  ///////////////////////////////////////////////////////////////////////////////////
  // router.get("/evento",  controlador.listaEventos)
  // router.post("/evento",  controlador.inserirPagamentoEvento)
  // router.put("/evento",  controlador.EditEvento)
  // router.delete("/evento",  controlador.DeleteEvento)

 
  app.use('/homepage', router);
};
