const urlBase = "https://localhost:8888/homepage";
const modalRegistar = document.getElementById("modalRegistar");
const bsModalRegistar = new bootstrap.Modal(
  modalRegistar,
  (backdrop = "static")
); // Pode passar opções

const btnModalRegistar = document.getElementById("btnModalRegistar");
const pRegistar = document.getElementById("pRegistar");


btnModalRegistar.addEventListener("click", () => {
  chamaModalRegistar();
});

function chamaModalRegistar() {
  document.getElementById("btnSubmitRegistar").style.display = "block";
  document.getElementById("btnCancelaRegistar").innerHTML = "Cancelar";
  bsModalRegistar.show();
}

const btnModalEspera = document.getElementById("btnModalEspera");
btnModalEspera.addEventListener("click", () => {
  chamaModalEspera();
});
function chamaModalEspera() {
  document.getElementById("btnSubmitEspera").style.display = "block";
  document.getElementById("btnCancelaEspera").innerHTML = "Cancelar";
  bsModalEspera.show();
}
const bsModalEspera = new bootstrap.Modal(
  ModalEspera,
  (backdrop = "static")
);


const btnModalDoc = document.getElementById("btnModalDoc");
btnModalDoc.addEventListener("click", () => {
  chamaModalDoc();
});
function chamaModalDoc() {
  document.getElementById("btnSubmitstatDoc").style.display = "block";
  document.getElementById("btnCancelaDoc").innerHTML = "Cancelar";
  bsModalDoc.show();
}
const bsModalDoc = new bootstrap.Modal(
  modalStatDoc,
  (backdrop = "static")
);


const btnModalQuota = document.getElementById("btnModalQuota");
btnModalQuota.addEventListener("click", () => {
  chamaModalQuota();
});
function chamaModalQuota() {
  document.getElementById("btnSubmitPagQuota").style.display = "block";
  document.getElementById("btnCancelaPagQuota").innerHTML = "Cancelar";
  bsModalQuota.show();
}
const bsModalQuota = new bootstrap.Modal(
  modalPagQuotas,
  (backdrop = "static")
);



const btnModalPagEvent = document.getElementById("btnModalPagEvent");
btnModalPagEvent.addEventListener("click", () => {
  chamaModalPagEvent();
});
function chamaModalPagEvent(isEdit = false, row = undefined) {
  document.getElementById("btnSubmitPagEvent").style.display = "block";
  document.getElementById("btnSubmitPagEvent").onclick = () => {
    inserirPagamentoEvento(isEdit);
  };

  document.getElementById("statusPagEvent").innerHTML = "";

  if (row) {
    document.getElementById("NINEvento").value = row.nin;
    document.getElementById("NINEvento").setAttribute('disabled','disabled');
    document.getElementById("event").value = row.event;
    document.getElementById("payment").value = row.payment;
    $('select[name=payment_status]').val(row.payment_status);
  } else {
    document.getElementById("NINEvento").value = "";
    document.getElementById("NINEvento").removeAttribute('disabled');
    document.getElementById("event").value = "";
    document.getElementById("payment").value = "";
    $('select[name=payment_status]').val(-1);
  }
  $('select[name=payment_status]').change();

  bsModalPagEvent.show();
}
const bsModalPagEvent = new bootstrap.Modal(
  modalPagEventos,
  (backdrop = "static")
);


const btnModalInsAss = document.getElementById("btnModalInsAss");
btnModalInsAss.addEventListener("click", () => {
  chamaModalInsAss();
});
function chamaModalInsAss() {
  document.getElementById("btnSubmitAssocciao").style.display = "block";
  document.getElementById("btnCancelarAssociacao").innerHTML = "Cancelar";
  bsModalInsAss.show();
}
const bsModalInsAss = new bootstrap.Modal(
  area,
  (backdrop = "static")
);


function validaRegisto() {
  let email = document.getElementById("emailRegistar").value; // email é validado pelo próprio browser
  let senha = document.getElementById("senhaRegistar").value; // tem de ter uma senha
  let section = document.getElementById("sectionRegistar").value;
  let nome = document.getElementById("usernameRegistar").value;
  const statReg = document.getElementById("statusRegistar");
  if (senha.length < 4) {
    document.getElementById("passErroLogin").innerHTML =
      "A password tem de ter ao menos 4 carateres";
    return;
  }
  fetch(`${urlBase}/registar`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: `email=${email}&password=${senha}&name=${nome}&section=${section}`,
  })
    .then((response) => {
      return response.json().then((body) => {
        if (response.status == 201) {
          console.log(body.message);
          statReg.innerHTML = body.message;
          document.getElementById("btnSubmitRegistar").style.display = "none";
          document.getElementById("btnCancelaRegistar").innerHTML =
            "Fechar este diálogo";
        } else {
          throw body;
        }
      });
    })
    .catch((body) => {
      result = body.message;
      document.getElementById(
        "statusRegistar"
      ).innerHTML = `${result}`;
      console.log("Catch:");
      console.log(result);
    });
}


function insereRegisto() {
  let nome = document.getElementById("nomeEspera").value;
  let nif = document.getElementById("nifEspera").value;
  let dtNasc = document.getElementById("dtNasc").value;
  let tlf = document.getElementById("tlfEspera").value;
  const statEsp = document.getElementById("statusInserirEspera");
  if (nif.length < 9) {
    document.getElementById("passErroNIF").innerHTML =
      "O NIF tem de ter 9 caracteres";
    return;
  }
  fetch(`${urlBase}/inserirEspera`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: `name=${nome}&nif=${nif}&dtNasc=${dtNasc}&tlf=${tlf}`,
  })
    .then((response) => {
      return response.json().then((body) => {
        if (response.status == 201) {
          console.log(body.message);
          statEsp.innerHTML = body.message;
          document.getElementById("btnSubmitListaEspera").innerHTML = "Sucesso!";
        }
      });
    })
    .catch((body) => {
      result = body.message;
      document.getElementById(
        "statusInserirEspera"
      ).innerHTML = `${result}`;
      console.log("Catch:");
      console.log(result);
    });
}


function inserirPagamentoEvento(isEdit = false) {
  let nin = document.getElementById("NINEvento").value;
  let event = document.getElementById("event").value;
  let payment = document.getElementById("payment").value;
  let payment_status = document.getElementById("payment_status").value;
  const statPag = document.getElementById("statusPagEvent");
  if (nin.length < 9) {
    document.getElementById("statusPagEvent").innerHTML =
      "O NIN tem de ter 9 caracteres";
    return;
  }
  const url = urlBase + '/' + (isEdit ? "editEvento" : "inserirPagamentoEvento");
  fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: isEdit ? "PUT" : "POST",
    body: `nin=${nin}&event=${event}&payment=${payment}&payment_status=${payment_status}`,
  })
    .then((response) => {
      return response.json().then((body) => {
        if (response.status == (isEdit ? 200 : 201)) {
          console.log(body.message);
          statPag.innerHTML = body.message;
          document.getElementById("btnSubmitPagEvent").innerHTML = "Sucesso!";
          $('#table').bootstrapTable('refresh');
          $('#modalPagEventos').modal('hide');
        }
      });
    })
    .catch((body) => {
      result = body.message;
      document.getElementById(
        "statusPagEvent"
      ).innerHTML = `${result}`;
      console.log("Catch:");
      console.log(result);
    });
}


function inserirPagamentoQuota() {
  let nin = document.getElementById("NINQuota").value;
  let payment = document.getElementById("paymentQuota").value;
  let payment_status = document.getElementById("payment_status_Quota").value;
  let school_year = document.getElementById("anoLec").value;
  const statPag = document.getElementById("statusPagQuota");
  if (nin.length < 9) {
    document.getElementById("passErroNIF").innerHTML =
      "O NIN tem de ter 9 caracteres";
    return;
  }
  fetch(`${urlBase}/inserirPagamentoQuota`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: `nin=${nin}&payment=${payment}&payment_status=${payment_status}&school_year=${school_year}`,
  })
    .then((response) => {
      return response.json().then((body) => {
        if (response.status == 201) {
          console.log(body.message);
          statPag.innerHTML = body.message;
          document.getElementById("btnSubmitPagQuota").innerHTML = "Sucesso!";
        }
      });
    })
    .catch((body) => {
      result = body.message;
      document.getElementById(
        "statusPagQuota"
      ).innerHTML = `${result}`;
      console.log("Catch:");
      console.log(result);
    });
}


function inserirEstadoDocumento() {
  let nin = document.getElementById("NINDoc").value;
  let send = document.getElementById("send").value;
  let assig = document.getElementById("assig").value;
  let received = document.getElementById("received").value;
  const statDoc = document.getElementById("statusDoc");
  if (nin.length < 9) {
    document.getElementById("passErroNIF").innerHTML =
      "O NIN tem de ter 9 caracteres";
    return;
  }
  fetch(`${urlBase}/inserirStatusDoc`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: `nin=${nin}&send=${send}&assig=${assig}&received=${received}`,
  })
    .then((response) => {
      return response.json().then((body) => {
        if (response.status == 201) {
          console.log(body.message);
          statPag.innerHTML = body.message;
          document.getElementById("btnSubmitstatDoc").innerHTML = "Sucesso!";
        }
      });
    })
    .catch((body) => {
      result = body.message;
      document.getElementById(
        "statusDoc"
      ).innerHTML = `${result}`;
      console.log("Catch:");
      console.log(result);
    });
}


function insereEscuteiro() {
  let nin = document.getElementById("nin").value;
  let admissiondate = document.getElementById("admissiondate").value;
  let section = document.getElementById("section").value;
  let name = document.getElementById("name").value;
  let citizencard = document.getElementById("citizencard").value;
  let personsex = document.getElementById("personsex").value;
  let nif = document.getElementById("nif").value;
  let birthdate = document.getElementById("birthdate").value;
  let nationality = document.getElementById("nationality").value;
  let naturalness = document.getElementById("naturalness").value;
  let address = document.getElementById("address").value;
  let vilage = document.getElementById("vilage").value;
  let zipcode = document.getElementById("zipcode").value;
  let city = document.getElementById("city").value;
  let district = document.getElementById("district").value;
  let mobilephone = document.getElementById("mobilephone").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let school = document.getElementById("school").value;
  let profession = document.getElementById("profession").value;
  let fathername = document.getElementById("fathername").value;
  let fatherprofession = document.getElementById("fatherprofession").value;
  let fathermobilephone = document.getElementById("fathermobilephone").value;
  let fatheremail = document.getElementById("fatheremail").value;
  let mothername = document.getElementById("mothername").value;
  let motherprofession = document.getElementById("motherprofession").value;
  let mothermobilephone = document.getElementById("mothermobilephone").value;
  let motheremail = document.getElementById("motheremail").value;
  let sponsername = document.getElementById("sponsername").value;
  let sponserprofession = document.getElementById("sponserprofession").value;
  let sponsermobilephone = document.getElementById("sponsermobilephone").value;
  let sponsoremail = document.getElementById("sponsoremail").value;
  let healthnumber = document.getElementById("healthnumber").value;
  let allergies = document.getElementById("asma").checked ? "Asma," : "";
  allergies += document.getElementById("epilepsia").checked ? "Epilepsia," : "";
  allergies += document.getElementById("diabetes").checked ? "Diabetes," : "";
  allergies += document.getElementById("alergias").checked ? "Alergias," : "";
  if (allergies.endsWith(',')) {
    allergies = allergies.substring(0, allergies.lastIndexOf(","));
  }
  let description_allergies = document.getElementById("description_allergies").value;
  let regular_medication = document.getElementById("regular_medication").value;
  let dietary_restrictions = document.getElementById("dietary_restrictions").value;
  let other_health_problems = document.getElementById("other_health_problems").value;
  let data_processing = document.getElementById("data_processing").value;
  let health_data = document.getElementById("health_data").value;
  let data_voice_image = document.getElementById("data_voice_image").value;
  let social_networks__educating = document.getElementById("social_networks__educating").value;
  let email_educating = document.getElementById("email_educating").value;
  let collective_transport = document.getElementById("collective_transport").value;
  let data_sharing = document.getElementById("data_sharing").value;
  let all_health_data = document.getElementById("all_health_data").value;
  let name1 = document.getElementById("name1").value;
  let parent1 = document.getElementById("parent1").value;
  let mobile1 = document.getElementById("mobile1").value;
  let name2 = document.getElementById("name2").value;
  let parent2 = document.getElementById("parent2").value;
  let mobile2 = document.getElementById("mobile2").value;
  if (nin.length < 5) {
    console.log("estamos a entrar na função")
    document.getElementById("passErroNIF").innerHTML =
      "O NIN tem de ter 12 caracteres";
    return;
  }
  fetch(`${urlBase}/insereEscuteiro`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: `nin=${nin}&admissiondate=${admissiondate}&section=${section}&name=${name}&citizencard=${citizencard}&personsex=${personsex}&nif=${nif}&birthdate=${birthdate}&nationality=${nationality}&naturalness=${naturalness}&address=${address}&vilage=${vilage}&zipcode=${zipcode}&city=${city}&district=${district}&mobilephone=${mobilephone}&phone=${phone}&email=${email}&school=${school}&profession=${profession}&fathername=${fathername}&fatherprofession=${fatherprofession}&fathermobilephone=${fathermobilephone}&fatheremail=${fatheremail}&mothername=${mothername}&motherprofession=${motherprofession}&mothermobilephone=${mothermobilephone}&motheremail=${motheremail}&sponsername=${sponsername}&sponserprofession=${sponserprofession}&sponsermobilephone=${sponsermobilephone}&sponsoremail=${sponsoremail}&healthnumber=${healthnumber}&allergies=${allergies}&description_allergies=${description_allergies}&regular_medication=${regular_medication}&dietary_restrictions=${dietary_restrictions}&other_health_problems=${other_health_problems}&data_processing=${data_processing}&health_data=${health_data}&data_voice_image=${data_voice_image}&social_networks__educating=${social_networks__educating}&email_educating=${email_educating}&collective_transport=${collective_transport}&data_sharing=${data_sharing}&all_health_data=${all_health_data}&name1=${name1}&parent1=${parent1}&mobile1=${mobile1}&name2=${name2}&parent2=${parent2}&mobile2=${mobile2}`,
  })
    .then((response) => {
      console.log("estamos a entrar no then")
      return response.json().then((body) => {
        if (response.status == 201) {
          console.log(body.message);
          statReg.innerHTML = body.message;
          document.getElementById("btnSubmitAssocciao").innerHTML = "Sucesso!";
        }
      });
    })
    .catch((body) => {
      result = body.message;
      document.getElementById(
        "statusInserirAssociacao"
      ).innerHTML = `${result}`;
      console.log("Catch:");
      console.log(result);
    });
}

function accoesFormatter (value, row, index) {
  return [
    '<a class="edit" href="javascript:void(0)" title="Edit">',
    '<i class="fa fa-edit"></i>',
    '</a>  ',
    '<a class="remove" href="javascript:void(0)" title="Remove">',
    '<i class="fa fa-trash"></i>',
    '</a>'
  ].join('')
}

window.eventAcoes = {
  'click .edit': function (e, value, row, index) {
    chamaModalPagEvent(true, row);
  },
  'click .remove': function (e, value, row, index) {
    deleteEvento(row.nin);
    $('#table').bootstrapTable('refresh');
  }
}

function deleteEvento(nin) {
  fetch(`${urlBase}/deleteEvento`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "DELETE",
    body: `nin=${nin}`,
  })
}

async function listarEventos() {
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemEventos/`,
    columns: [{
      events: eventAcoes,
      field: 'acoes',
      formatter: accoesFormatter,
      title: 'Ações'
    }, {
      field: 'nin',
      title: 'NIN'
    }, {
      field: 'event',
      title: 'Evento'
    }, {
      field: 'payment',
      title: 'Pagamento'
    }, {
      field: 'payment_status',
      title: 'Estado do Pagamento'
    }]
  })
}


async function listarQuotas() {
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemQuotas/`,
    columns: [{
      field: '----',
      title: 'Editar'
    }, {
      field: '----',
      title: 'Apagar'
    }, {
      field: 'nin',
      title: 'NIN'
    }, {
      field: 'payment',
      title: 'Valor Pago'
    }, {
      field: 'payment_status',
      title: 'Estado do Pagamento'
    }, {
      field: 'school_year',
      title: 'Ano Letivo'
    }]
  })
}


async function listarEspera() {
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemEspera/`,
    columns: [{
      field: '----',
      title: 'Editar'
    }, {
      field: '----',
      title: 'Apagar'
    }, {
      field: 'name',
      title: 'Nome'
    }, {
      field: 'nif',
      title: 'NIF'
    }, {
      field: 'tlf',
      title: 'Telefone'
    }, {
      field: 'dtNasc',
      title: 'Data de Nascimento'
    }]
  })
}


async function listarDocumentos() {
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemDocumentos/`,
    columns: [{
      field: '----',
      title: 'Editar'
    }, {
      field: '----',
      title: 'Apagar'
    }, {
      field: 'nin',
      title: 'NIN'
    }, {
      field: 'send',
      title: 'Documento Enviado'
    }, {
      field: 'signature',
      title: 'Documento Assinado'
    }, {
      field: 'received',
      title: 'Documento Recebido'
    }]
  })
}

async function listarLobitos() {
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemLobitos/`,
    columns: [{
      field: '----',
      title: 'Editar'
    }, {
      field: '----',
      title: 'Apagar'
    },{
        field: 'nin',
        title: 'NIN'
      }, {
        field: 'admission',
        title: 'Data Admissão'
      }, {
        field: 'section',
        title: 'Secção'
      },
      {
        field: 'name',
        title: 'Nome'
      },
      {
        field: 'citizencard',
        title: 'CC'
      },
      {
        field: 'personsex',
        title: 'Genero'
      },
      {
        field: 'nif',
        title: 'NIF'
      },
      {
        field: 'birth',
        title: 'Data de Nascimento'
      },
      {
        field: 'nationality',
        title: 'Nacionalidade'
      },
      {
        field: 'naturalness',
        title: 'Naturalidade'
      },
      {
        field: 'address',
        title: 'Morada'
      },
      {
        field: 'vilage',
        title: 'Localidade'
      },
      {
        field: 'zipcode',
        title: 'Codigo-Postal'
      },
      {
        field: 'city',
        title: 'Concelho'
      },
      {
        field: 'district',
        title: 'Distrito'
      },
      {
        field: 'mobilephone',
        title: 'Telemóvel'
      },
      {
        field: 'phone',
        title: 'Telefone'
      },
      {
        field: 'email',
        title: 'Email'
      },
      {
        field: 'school',
        title: 'Habilitações'
      },
      {
        field: 'profession',
        title: 'Profissão'
      },
      {
        field: 'fathername',
        title: 'Nome do Pai'
      },
      {
        field: 'fatherprofession',
        title: 'Profissão do Pai'
      },
      {
        field: 'fathermobilephone',
        title: 'Telemóvel do Pai'
      },
      {
        field: 'fatheremail',
        title: 'Email do Pai'
      },
      {
        field: 'mothername',
        title: 'Nome da Mãe'
      },
      {
        field: 'motherprofession',
        title: 'Profissão da Mãe'
      },
      {
        field: 'mothermobilephone',
        title: 'Telemóvel da Mãe'
      },
      {
        field: 'motheremail',
        title: 'Email da Mãe'
      },
      {
        field: 'sponsername',
        title: 'Nome Enc. Educação'
      },
      {
        field: 'sponserprofession',
        title: 'Profissão Enc. Educação'
      },
      {
        field: 'sponsermobilephone',
        title: 'Telemóvel Enc. Educação'
      },
      {
        field: 'sponsoremail',
        title: 'Email Enc. Educação'
      },
      {
        field: 'healthnumber',
        title: 'Nº Utente'
      },
      {
        field: 'allergies',
        title: 'Alergias'
      },
      {
        field: 'description_allergies',
        title: 'Descrição Alergias'
      },
      {
        field: 'regular_medication',
        title: 'Medicação Regular'
      },
      {
        field: 'dietary_restrictions',
        title: 'Restrições Alimentares'
      },
      {
        field: 'other_health_problems',
        title: 'Outros Problemas de Saúde'
      },
      {
        field: 'data_processing',
        title: 'Consentimento Tratamento Dados'
      },
      {
        field: 'health_data',
        title: 'Consentimento Saúde'
      },
      {
        field: 'data_voice_image',
        title: 'Consentimento Voz e/ou Imagem'
      },
      {
        field: 'social_networks__educating',
        title: 'Consentimento Redes Sociais'
      },
      {
        field: 'email_educating',
        title: 'Consentimento Email'
      },
      {
        field: 'collective_transport',
        title: 'Consentimento Transporte'
      },
      {
        field: 'data_sharing',
        title: 'Consentimento CPP'
      },
      {
        field: 'all_health_data',
        title: 'Consentimento Total'
      },
      {
        field: 'name1',
        title: 'Nome Emergencia'
      },
      {
        field: 'parent1',
        title: 'Parentesco'
      },
      {
        field: 'mobile1',
        title: 'Telemóvel Emergencia'
      },
      {
        field: 'name2',
        title: 'Nome Emergencia'
      },
      {
        field: 'parent2',
        title: 'Parentesco'
      },
      {
        field: 'mobile2',
        title: 'Telemóvel Emergencia'
      }
    ]
  })
}

async function listarExploradores() {
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemExploradores/`,
    columns: [{
      field: '----',
      title: 'Editar'
    }, {
      field: '----',
      title: 'Apagar'
    }, {
        field: 'nin',
        title: 'NIN'
      }, {
        field: 'admission',
        title: 'Data Admissão'
      }, {
        field: 'section',
        title: 'Secção'
      },
      {
        field: 'name',
        title: 'Nome'
      },
      {
        field: 'citizencard',
        title: 'CC'
      },
      {
        field: 'personsex',
        title: 'Genero'
      },
      {
        field: 'nif',
        title: 'NIF'
      },
      {
        field: 'birth',
        title: 'Data de Nascimento'
      },
      {
        field: 'nationality',
        title: 'Nacionalidade'
      },
      {
        field: 'naturalness',
        title: 'Naturalidade'
      },
      {
        field: 'address',
        title: 'Morada'
      },
      {
        field: 'vilage',
        title: 'Localidade'
      },
      {
        field: 'zipcode',
        title: 'Codigo-Postal'
      },
      {
        field: 'city',
        title: 'Concelho'
      },
      {
        field: 'district',
        title: 'Distrito'
      },
      {
        field: 'mobilephone',
        title: 'Telemóvel'
      },
      {
        field: 'phone',
        title: 'Telefone'
      },
      {
        field: 'email',
        title: 'Email'
      },
      {
        field: 'school',
        title: 'Habilitações'
      },
      {
        field: 'profession',
        title: 'Profissão'
      },
      {
        field: 'fathername',
        title: 'Nome do Pai'
      },
      {
        field: 'fatherprofession',
        title: 'Profissão do Pai'
      },
      {
        field: 'fathermobilephone',
        title: 'Telemóvel do Pai'
      },
      {
        field: 'fatheremail',
        title: 'Email do Pai'
      },
      {
        field: 'mothername',
        title: 'Nome da Mãe'
      },
      {
        field: 'motherprofession',
        title: 'Profissão da Mãe'
      },
      {
        field: 'mothermobilephone',
        title: 'Telemóvel da Mãe'
      },
      {
        field: 'motheremail',
        title: 'Email da Mãe'
      },
      {
        field: 'sponsername',
        title: 'Nome Enc. Educação'
      },
      {
        field: 'sponserprofession',
        title: 'Profissão Enc. Educação'
      },
      {
        field: 'sponsermobilephone',
        title: 'Telemóvel Enc. Educação'
      },
      {
        field: 'sponsoremail',
        title: 'Email Enc. Educação'
      },
      {
        field: 'healthnumber',
        title: 'Nº Utente'
      },
      {
        field: 'allergies',
        title: 'Alergias'
      },
      {
        field: 'description_allergies',
        title: 'Descrição Alergias'
      },
      {
        field: 'regular_medication',
        title: 'Medicação Regular'
      },
      {
        field: 'dietary_restrictions',
        title: 'Restrições Alimentares'
      },
      {
        field: 'other_health_problems',
        title: 'Outros Problemas de Saúde'
      },
      {
        field: 'data_processing',
        title: 'Consentimento Tratamento Dados'
      },
      {
        field: 'health_data',
        title: 'Consentimento Saúde'
      },
      {
        field: 'data_voice_image',
        title: 'Consentimento Voz e/ou Imagem'
      },
      {
        field: 'social_networks__educating',
        title: 'Consentimento Redes Sociais'
      },
      {
        field: 'email_educating',
        title: 'Consentimento Email'
      },
      {
        field: 'collective_transport',
        title: 'Consentimento Transporte'
      },
      {
        field: 'data_sharing',
        title: 'Consentimento CPP'
      },
      {
        field: 'all_health_data',
        title: 'Consentimento Total'
      },
      {
        field: 'name1',
        title: 'Nome Emergencia'
      },
      {
        field: 'parent1',
        title: 'Parentesco'
      },
      {
        field: 'mobile1',
        title: 'Telemóvel Emergencia'
      },
      {
        field: 'name2',
        title: 'Nome Emergencia'
      },
      {
        field: 'parent2',
        title: 'Parentesco'
      },
      {
        field: 'mobile2',
        title: 'Telemóvel Emergencia'
      }
    ]
  })
}

async function listarPioneiros() {
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemPioneiros/`,
    columns: [{
      field: '----',
      title: 'Editar'
    }, {
      field: '----',
      title: 'Apagar'
    }, {
        field: 'nin',
        title: 'NIN'
      }, {
        field: 'admission',
        title: 'Data Admissão'
      }, {
        field: 'section',
        title: 'Secção'
      },
      {
        field: 'name',
        title: 'Nome'
      },
      {
        field: 'citizencard',
        title: 'CC'
      },
      {
        field: 'personsex',
        title: 'Genero'
      },
      {
        field: 'nif',
        title: 'NIF'
      },
      {
        field: 'birth',
        title: 'Data de Nascimento'
      },
      {
        field: 'nationality',
        title: 'Nacionalidade'
      },
      {
        field: 'naturalness',
        title: 'Naturalidade'
      },
      {
        field: 'address',
        title: 'Morada'
      },
      {
        field: 'vilage',
        title: 'Localidade'
      },
      {
        field: 'zipcode',
        title: 'Codigo-Postal'
      },
      {
        field: 'city',
        title: 'Concelho'
      },
      {
        field: 'district',
        title: 'Distrito'
      },
      {
        field: 'mobilephone',
        title: 'Telemóvel'
      },
      {
        field: 'phone',
        title: 'Telefone'
      },
      {
        field: 'email',
        title: 'Email'
      },
      {
        field: 'school',
        title: 'Habilitações'
      },
      {
        field: 'profession',
        title: 'Profissão'
      },
      {
        field: 'fathername',
        title: 'Nome do Pai'
      },
      {
        field: 'fatherprofession',
        title: 'Profissão do Pai'
      },
      {
        field: 'fathermobilephone',
        title: 'Telemóvel do Pai'
      },
      {
        field: 'fatheremail',
        title: 'Email do Pai'
      },
      {
        field: 'mothername',
        title: 'Nome da Mãe'
      },
      {
        field: 'motherprofession',
        title: 'Profissão da Mãe'
      },
      {
        field: 'mothermobilephone',
        title: 'Telemóvel da Mãe'
      },
      {
        field: 'motheremail',
        title: 'Email da Mãe'
      },
      {
        field: 'sponsername',
        title: 'Nome Enc. Educação'
      },
      {
        field: 'sponserprofession',
        title: 'Profissão Enc. Educação'
      },
      {
        field: 'sponsermobilephone',
        title: 'Telemóvel Enc. Educação'
      },
      {
        field: 'sponsoremail',
        title: 'Email Enc. Educação'
      },
      {
        field: 'healthnumber',
        title: 'Nº Utente'
      },
      {
        field: 'allergies',
        title: 'Alergias'
      },
      {
        field: 'description_allergies',
        title: 'Descrição Alergias'
      },
      {
        field: 'regular_medication',
        title: 'Medicação Regular'
      },
      {
        field: 'dietary_restrictions',
        title: 'Restrições Alimentares'
      },
      {
        field: 'other_health_problems',
        title: 'Outros Problemas de Saúde'
      },
      {
        field: 'data_processing',
        title: 'Consentimento Tratamento Dados'
      },
      {
        field: 'health_data',
        title: 'Consentimento Saúde'
      },
      {
        field: 'data_voice_image',
        title: 'Consentimento Voz e/ou Imagem'
      },
      {
        field: 'social_networks__educating',
        title: 'Consentimento Redes Sociais'
      },
      {
        field: 'email_educating',
        title: 'Consentimento Email'
      },
      {
        field: 'collective_transport',
        title: 'Consentimento Transporte'
      },
      {
        field: 'data_sharing',
        title: 'Consentimento CPP'
      },
      {
        field: 'all_health_data',
        title: 'Consentimento Total'
      },
      {
        field: 'name1',
        title: 'Nome Emergencia'
      },
      {
        field: 'parent1',
        title: 'Parentesco'
      },
      {
        field: 'mobile1',
        title: 'Telemóvel Emergencia'
      },
      {
        field: 'name2',
        title: 'Nome Emergencia'
      },
      {
        field: 'parent2',
        title: 'Parentesco'
      },
      {
        field: 'mobile2',
        title: 'Telemóvel Emergencia'
      }
    ]
  })
}

async function listarCaminheiros() {
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemCaminheiros/`,
    columns: [{
      field: '----',
      title: 'Editar'
    }, {
      field: '----',
      title: 'Apagar'
    }, {
        field: 'nin',
        title: 'NIN'
      }, {
        field: 'admission',
        title: 'Data Admissão'
      }, {
        field: 'section',
        title: 'Secção'
      },
      {
        field: 'name',
        title: 'Nome'
      },
      {
        field: 'citizencard',
        title: 'CC'
      },
      {
        field: 'personsex',
        title: 'Genero'
      },
      {
        field: 'nif',
        title: 'NIF'
      },
      {
        field: 'birth',
        title: 'Data de Nascimento'
      },
      {
        field: 'nationality',
        title: 'Nacionalidade'
      },
      {
        field: 'naturalness',
        title: 'Naturalidade'
      },
      {
        field: 'address',
        title: 'Morada'
      },
      {
        field: 'vilage',
        title: 'Localidade'
      },
      {
        field: 'zipcode',
        title: 'Codigo-Postal'
      },
      {
        field: 'city',
        title: 'Concelho'
      },
      {
        field: 'district',
        title: 'Distrito'
      },
      {
        field: 'mobilephone',
        title: 'Telemóvel'
      },
      {
        field: 'phone',
        title: 'Telefone'
      },
      {
        field: 'email',
        title: 'Email'
      },
      {
        field: 'school',
        title: 'Habilitações'
      },
      {
        field: 'profession',
        title: 'Profissão'
      },
      {
        field: 'fathername',
        title: 'Nome do Pai'
      },
      {
        field: 'fatherprofession',
        title: 'Profissão do Pai'
      },
      {
        field: 'fathermobilephone',
        title: 'Telemóvel do Pai'
      },
      {
        field: 'fatheremail',
        title: 'Email do Pai'
      },
      {
        field: 'mothername',
        title: 'Nome da Mãe'
      },
      {
        field: 'motherprofession',
        title: 'Profissão da Mãe'
      },
      {
        field: 'mothermobilephone',
        title: 'Telemóvel da Mãe'
      },
      {
        field: 'motheremail',
        title: 'Email da Mãe'
      },
      {
        field: 'sponsername',
        title: 'Nome Enc. Educação'
      },
      {
        field: 'sponserprofession',
        title: 'Profissão Enc. Educação'
      },
      {
        field: 'sponsermobilephone',
        title: 'Telemóvel Enc. Educação'
      },
      {
        field: 'sponsoremail',
        title: 'Email Enc. Educação'
      },
      {
        field: 'healthnumber',
        title: 'Nº Utente'
      },
      {
        field: 'allergies',
        title: 'Alergias'
      },
      {
        field: 'description_allergies',
        title: 'Descrição Alergias'
      },
      {
        field: 'regular_medication',
        title: 'Medicação Regular'
      },
      {
        field: 'dietary_restrictions',
        title: 'Restrições Alimentares'
      },
      {
        field: 'other_health_problems',
        title: 'Outros Problemas de Saúde'
      },
      {
        field: 'data_processing',
        title: 'Consentimento Tratamento Dados'
      },
      {
        field: 'health_data',
        title: 'Consentimento Saúde'
      },
      {
        field: 'data_voice_image',
        title: 'Consentimento Voz e/ou Imagem'
      },
      {
        field: 'social_networks__educating',
        title: 'Consentimento Redes Sociais'
      },
      {
        field: 'email_educating',
        title: 'Consentimento Email'
      },
      {
        field: 'collective_transport',
        title: 'Consentimento Transporte'
      },
      {
        field: 'data_sharing',
        title: 'Consentimento CPP'
      },
      {
        field: 'all_health_data',
        title: 'Consentimento Total'
      },
      {
        field: 'name1',
        title: 'Nome Emergencia'
      },
      {
        field: 'parent1',
        title: 'Parentesco'
      },
      {
        field: 'mobile1',
        title: 'Telemóvel Emergencia'
      },
      {
        field: 'name2',
        title: 'Nome Emergencia'
      },
      {
        field: 'parent2',
        title: 'Parentesco'
      },
      {
        field: 'mobile2',
        title: 'Telemóvel Emergencia'
      }
    ]
  })
}

async function listarSecretarios() {
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemSecretario/`,
    columns: [{
      field: '----',
      title: 'Editar'
    }, {
      field: '----',
      title: 'Apagar'
    }, {
      field: 'email',
      title: 'Email'
    }, {
      field: 'name',
      title: 'Nome'
    }, {
      field: 'section',
      title: 'Secção'
    }]
  })
}