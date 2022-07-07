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

  // Lista o status dos eventos não pagos
  router.get("/listagemEventosNaoPagos/", controlador.listaEventosNaoPagos);
   
  // Editar evento
  router.put("/editEvento", controlador.EditEvento);
  
  // Apagar evento
  router.delete("/deleteEvento", controlador.DeleteEvento);

///////////////////////////////////////////////////////////////////////////////////
  // Inserir um pagamento de uma quota 
  router.post("/inserirPagamentoQuota", controlador.inserirPagamentoQuota);

  // Lista as quotas
  router.get("/listagemQuotas/", controlador.listaQuotas);

  // Lista o status das Quotas não pagos
  router.get("/listagemQuotasNaoPagas/", controlador.listaQuotasNaoPagas);

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

  // Lista o status dos documentos não pagos
  router.get("/listagemDocumentosNaoAssinados/", controlador.listaDocumentosNaoAssinados);

  // Editar Documento
  router.put("/editDocumento", controlador.EditDocumento);

  // Apagar Documento
  router.delete("/deleteDocumento", controlador.DeleteDocumento);

///////////////////////////////////////////////////////////////////////////////////  
  // Inserir um associado ao agrupamento
  router.post("/insereEscuteiro", controlador.inserirEscuteiro);

  // Editar Caminheiro
  router.put("/editEscuteiro", controlador.editEscuteiro);

  // Lista os Lobitos
  router.get("/listagemLobitos/", controlador.listaLobitos);

  // Apagar Lobito
  router.delete("/deleteLobito", controlador.DeleteEscuteiro);

  // Lista os Explorador
  router.get("/listagemExploradores/", controlador.listaExploradores);

  // Apagar Explorador
  router.delete("/deleteExplorador", controlador.DeleteEscuteiro);
  
  // Lista os Pioneiros
  router.get("/listagemPioneiros/", controlador.listaPioneiros);

  // Apagar Pioneiro
  router.delete("/deletePioneiro", controlador.DeleteEscuteiro);
    
  // Lista os Caminheiros
  router.get("/listagemCaminheiros/", controlador.listaCaminheiros);

  // Apagar Caminheiro
  router.delete("/deleteCaminheiro", controlador.DeleteEscuteiro);


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
