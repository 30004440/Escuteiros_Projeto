const urlBase = "https://agrupamento1240murtal.herokuapp.com/homepage";

async function getBase64(file) {
  let result_base64 = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
  });
  return result_base64;
}

const modalRegistar = document.getElementById("modalRegistar");
const bsModalRegistar = new bootstrap.Modal(
  modalRegistar,
  (backdrop = "static")
);

function cleanAndRebuildTableTemplate() {
  document.getElementById("content").innerHTML = "<table id=\"table\"></table>";
}

const btnModalRegistar = document.getElementById("btnModalRegistar");
const pRegistar = document.getElementById("pRegistar");
btnModalRegistar.addEventListener("click", () => {
  chamaModalRegistar();
});

function chamaModalRegistar(isEdit = false, row = undefined) {
  document.getElementById("btnSubmitRegistar").style.display = "block";
  document.getElementById("btnSubmitRegistar").onclick = () => {
    validaRegisto(isEdit);
  };
  document.getElementById("statusRegistar").innerHTML = "";
  document.getElementById("btnSubmitRegistar").innerHTML = "Submeter";
  if (row) {
    document.getElementById("usernameRegistar").value = row.name;
    document.getElementById("usernameRegistar").setAttribute('disabled','disabled');
    document.getElementById("senhaRegistar").value = row.nin;
    document.getElementById("senhaRegistar").setAttribute('disabled','disabled');
    document.getElementById("emailRegistar").value = row.email;
    $('select[name=sectionRegistar]').val(row.section);
  } else {
    document.getElementById("usernameRegistar").value = "";
    document.getElementById("usernameRegistar").removeAttribute('disabled');
	document.getElementById("senhaRegistar").value = "";
    document.getElementById("senhaRegistar").removeAttribute('disabled');
    document.getElementById("emailRegistar").value = "";
    $('select[name=sectionRegistar]').val(-1);
  }
  $('select[name=sectionRegistar]').change(); 
  bsModalRegistar.show();
}

const btnModalEspera = document.getElementById("btnModalEspera");
btnModalEspera.addEventListener("click", () => {
  chamaModalEspera();
});
function chamaModalEspera (isEdit = false, row = undefined) {
  document.getElementById("btnSubmitEspera").style.display = "block";
  document.getElementById("btnSubmitEspera").onclick = () => {
    insereRegisto(isEdit);
  };
  document.getElementById("statusPagEvent").innerHTML = "";
  document.getElementById("btnSubmitEspera").innerHTML = "Submeter";
  if (row) {
    document.getElementById("nifEspera").value = row.nif;
    document.getElementById("nifEspera").setAttribute('disabled','disabled');
    document.getElementById("nomeEspera").value = row.name;
    document.getElementById("birthdate").value = row.birthdate;
    document.getElementById("tlfEspera").value = row.tlf;
  } else {
    document.getElementById("nifEspera").value = "";
    document.getElementById("nifEspera").removeAttribute('disabled');
    document.getElementById("nomeEspera").value = "";
    document.getElementById("birthdate").value = "";
    document.getElementById("tlfEspera").value = "";
  }
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
function chamaModalDoc (isEdit = false, row = undefined) {
  document.getElementById("btnSubmitstatDoc").style.display = "block";
  document.getElementById("btnSubmitstatDoc").onclick = () => {
    inserirEstadoDocumento(isEdit);
  };
  document.getElementById("statusDoc").innerHTML = "";
  document.getElementById("btnSubmitstatDoc").innerHTML = "Submeter";
  if (row) {
    document.getElementById("NINDoc").value = row.nin;
    document.getElementById("NINDoc").setAttribute('disabled','disabled');
    $('select[name=send]').val(row.send);
    $('select[name=signature]').val(row.signature);
    $('select[name=received]').val(row.received);
  }	else {
    document.getElementById("NINDoc").value = "";
    document.getElementById("NINDoc").removeAttribute('disabled');
    $('select[name=send]').val(-1);
    $('select[name=signature]').val(-1);
    $('select[name=received]').val(-1);
  }
  $('select[name=send]').change();
  $('select[name=signature]').change(); 
  $('select[name=received]').change(); 
  
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
function chamaModalQuota (isEdit = false, row = undefined) {
  document.getElementById("btnSubmitPagQuota").style.display = "block";
  document.getElementById("btnSubmitPagQuota").onclick = () => {
  inserirPagamentoQuota(isEdit);
  };
  document.getElementById("statusPagQuota").innerHTML = "";
  document.getElementById("btnSubmitPagQuota").innerHTML = "Submeter";
  if (row) {
    document.getElementById("NINQuota").value = row.nin;
    document.getElementById("NINQuota").setAttribute('disabled','disabled');
    document.getElementById("paymentQuota").value = row.payment;
    document.getElementById("anoLec").value = row.school_year;
    $('select[name=payment_status_Quota]').val(row.payment_status);
  }	else {
    document.getElementById("NINQuota").value = "";
    document.getElementById("NINQuota").removeAttribute('disabled');
    document.getElementById("paymentQuota").value = "";
    document.getElementById("anoLec").value = "";
    $('select[name=payment_status_Quota]').val(-1);
  }
  $('select[name=payment_status_Quota]').change();								

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
  document.getElementById("btnSubmitPagEvent").innerHTML = "Submeter";
  if (row) {
    document.getElementById("NINEvento").value = row.nin;
    document.getElementById("NINEvento").setAttribute('disabled','disabled');
    document.getElementById("event").value = row.event;
    document.getElementById("payment").value = row.payment;
    document.getElementById("valueEvent").value = row.valueEvent
    $('select[name=payment_status]').val(row.payment_status);
  } else {
    document.getElementById("NINEvento").value = "";
    document.getElementById("NINEvento").removeAttribute('disabled');
    document.getElementById("event").value = "";
    document.getElementById("payment").value = "";
    document.getElementById("valueEvent").value = "";
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

function chamaModalInsAss(isEdit = false, row = undefined) {
  document.getElementById("btnSubmitAssocciao").style.display = "block";
  document.getElementById("btnSubmitAssocciao").onclick = () => {
    insereEscuteiro(isEdit, row);
  };
  document.getElementById("statusInserirEscuteiro").innerHTML = "";
  document.getElementById("btnSubmitAssocciao").innerHTML = "Submeter";
  if (row) {
    document.getElementById("nin").value = row.nin;
    document.getElementById("nin").setAttribute('disabled','disabled');
    document.getElementById("admissiondate").value = row.admissiondate;
    document.getElementById("admissiondate").setAttribute('disabled','disabled');
	  document.getElementById("name").value = row.name;
	  document.getElementById("citizencard").value = row.citizencard;
  	document.getElementById("nif").value = row.nif;
	  document.getElementById("birthdateAss").value = row.birthdateAss;
	  document.getElementById("nationality").value = row.nationality;
	  document.getElementById("naturalness").value = row.naturalness;
	  document.getElementById("address").value = row.address;
	  document.getElementById("vilage").value = row.vilage;
	  document.getElementById("zipcode").value = row.zipcode;
	  document.getElementById("city").value = row.city;
	  document.getElementById("district").value = row.district;
	  document.getElementById("mobilephone").value = row.mobilephone;
	  document.getElementById("phone").value = row.phone;
	  document.getElementById("email").value = row.email;
	  document.getElementById("profession").value = row.profession;
	  document.getElementById("fathername").value = row.fathername;
	  document.getElementById("fatherprofession").value = row.fatherprofession;
	  document.getElementById("fathermobilephone").value = row.fathermobilephone;
	  document.getElementById("fatheremail").value = row.fatheremail;
	  document.getElementById("mothername").value = row.mothername;
	  document.getElementById("motherprofession").value = row.motherprofession;
	  document.getElementById("mothermobilephone").value = row.mothermobilephone;
  	document.getElementById("motheremail").value = row.motheremail;
	  document.getElementById("sponsername").value = row.sponsername;
	  document.getElementById("sponserprofession").value = row.sponserprofession;
  	document.getElementById("sponsermobilephone").value = row.sponsermobilephone;
	  document.getElementById("sponsoremail").value = row.sponsoremail;
  	document.getElementById("healthnumber").value = row.healthnumber;
  	document.getElementById("asma").value = row.asma;
  	document.getElementById("epilepsia").value = row.epilepsia;
  	document.getElementById("diabetes").value = row.diabetes;
  	document.getElementById("alergias").value = row.alergias;
  	document.getElementById("description_allergies").value = row.description_allergies;
  	document.getElementById("regular_medication").value = row.regular_medication;
  	document.getElementById("dietary_restrictions").value = row.dietary_restrictions;
  	document.getElementById("other_health_problems").value = row.other_health_problems;
  	document.getElementById("name1").value = row.name1;
  	document.getElementById("parent1").value = row.parent1;
  	document.getElementById("mobile1").value = row.mobile1;
	  document.getElementById("name2").value = row.name2;
	  document.getElementById("parent2").value = row.parent2;
	  document.getElementById("mobile2").value = row.mobile2;
    $('select[name=section]').val(row.section);
  	$('select[name=personsex]').val(row.personsex);
  	$('select[name=school]').val(row.school);
	  $('select[name=data_processing]').val(row.data_processing);
	  $('select[name=health_data]').val(row.health_data);
   	$('select[name=data_voice_image]').val(row.data_voice_image);
  	$('select[name=social_networks__educating]').val(row.social_networks__educating);
  	$('select[name=email_educating]').val(row.email_educating);
  	$('select[name=collective_transport]').val(row.collective_transport);
	  $('select[name=data_sharing]').val(row.data_sharing);
  	$('select[name=all_health_data]').val(row.all_health_data);
  }	else {
    document.getElementById("nin").value = "";
    document.getElementById("nin").removeAttribute('disabled');
	  document.getElementById("admissiondate").value = "";
    document.getElementById("admissiondate").removeAttribute('disabled');
  	document.getElementById("section").value = "";
  	document.getElementById("name").value = "";
  	document.getElementById("citizencard").value = "";
		document.getElementById("name").value = "";
  	document.getElementById("citizencard").value = "";
	  document.getElementById("nif").value = "";
  	document.getElementById("birthdateAss").value = "";
	  document.getElementById("nationality").value = "";
  	document.getElementById("naturalness").value = "";
	  document.getElementById("address").value = "";
  	document.getElementById("vilage").value = "";
	  document.getElementById("zipcode").value = "";
  	document.getElementById("city").value = "";
	  document.getElementById("district").value = "";
  	document.getElementById("mobilephone").value = "";
	  document.getElementById("phone").value = "";
  	document.getElementById("email").value = "";
	  document.getElementById("profession").value = "";
  	document.getElementById("fathername").value = "";
	  document.getElementById("fatherprofession").value = "";
  	document.getElementById("fathermobilephone").value = "";
	  document.getElementById("fatheremail").value = "";
  	document.getElementById("mothername").value = "";
	  document.getElementById("motherprofession").value = "";
  	document.getElementById("mothermobilephone").value = "";
	  document.getElementById("motheremail").value = "";
  	document.getElementById("sponsername").value = "";
	  document.getElementById("sponserprofession").value = "";
  	document.getElementById("sponsermobilephone").value = "";
	  document.getElementById("sponsoremail").value = "";
	  document.getElementById("healthnumber").value = "";
	  document.getElementById("asma").value = "";
  	document.getElementById("epilepsia").value = "";
	  document.getElementById("diabetes").value = "";
  	document.getElementById("alergias").value = "";
	  document.getElementById("description_allergies").value = "";
  	document.getElementById("regular_medication").value = "";
	  document.getElementById("dietary_restrictions").value = "";
  	document.getElementById("other_health_problems").value = "";
	  document.getElementById("name1").value = "";
  	document.getElementById("parent1").value = "";
	  document.getElementById("mobile1").value = "";
  	document.getElementById("name2").value = "";
	  document.getElementById("parent2").value = "";
  	document.getElementById("mobile2").value = "";
    $('select[name=section]').val(-1);
  	$('select[name=personsex]').val(-1);
  	$('select[name=school]').val(-1);
	  $('select[name=data_processing]').val(-1);
  	$('select[name=health_data]').val(-1);
	  $('select[name=data_voice_image]').val(-1);
  	$('select[name=social_networks__educating]').val(-1);
	  $('select[name=email_educating]').val(-1);
  	$('select[name=collective_transport]').val(-1);
	  $('select[name=data_sharing]').val(-1);
  	$('select[name=all_health_data]').val(-1);
  }
  document.getElementById('upload').value = "";
  $('select[name=section]').change();	
  $('select[name=personsex]').change();	
  $('select[name=school]').change();	
  $('select[name=data_processing]').change();	
  $('select[name=health_data]').change();	
  $('select[name=data_voice_image]').change();	
  $('select[name=social_networks__educating]').change();	
  $('select[name=email_educating]').change();	
  $('select[name=collective_transport]').change();	
  $('select[name=data_sharing]').change();	
  $('select[name=all_health_data]').change();	

  bsModalInsAss.show();
} 
const bsModalInsAss = new bootstrap.Modal(
  area,
  (backdrop = "static")
);


function validaRegisto(isEdit = false) {
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
  const url = urlBase + '/' + (isEdit ? "editSecretario" : "registar");
  fetch(url, {		  
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: isEdit ? "PUT" : "POST",
    body: `email=${email}&password=${senha}&name=${nome}&section=${section}`,
  })
    .then((response) => {
      return response.json().then((body) => {
        if (response.status == (isEdit ? 200 : 201)) {
          console.log(body.message);
          statReg.innerHTML = body.message;
          document.getElementById("btnSubmitRegistar").innerHTML = "Sucesso!";
          $('#table').bootstrapTable('refresh');
          $('#modalRegistar').modal('hide');
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


function insereRegisto(isEdit = false) {
  let nome = document.getElementById("nomeEspera").value;
  let nif = document.getElementById("nifEspera").value;
  let birthdate = document.getElementById("birthdate").value;
  let tlf = document.getElementById("tlfEspera").value;
  const statEsp = document.getElementById("statusInserirEspera");
  if (nif.length < 9) {
    document.getElementById("passErroNIF").innerHTML =
      "O NIF tem de ter 9 caracteres";
    return;
  }
  const url = urlBase + '/' + (isEdit ? "editEspera" : "inserirEspera");
  fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: isEdit ? "PUT" : "POST",
    body: `name=${nome}&nif=${nif}&birthdate=${birthdate}&tlf=${tlf}`,
  })
    .then((response) => {
      return response.json().then((body) => {
        if (response.status == (isEdit ? 200 : 201)) {
          console.log(body.message);
          statEsp.innerHTML = body.message;
          document.getElementById("btnSubmitEspera").innerHTML = "Sucesso!";
          $('#table').bootstrapTable('refresh');
          $('#ModalEspera').modal('hide');													  
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
  let valueEvent = document.getElementById("valueEvent").value;
  const statPag = document.getElementById("statusPagEvent");
  if (nin.length < 17) {
    document.getElementById("statusPagEvent").innerHTML =
      "O NIN tem de ter 17 caracteres";
    return;
  }
  const url = urlBase + '/' + (isEdit ? "editEvento" : "inserirPagamentoEvento");
  fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: isEdit ? "PUT" : "POST",
    body: `nin=${nin}&event=${event}&payment=${payment}&payment_status=${payment_status}&valueEvent=${valueEvent}`,
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


function inserirPagamentoQuota(isEdit = false) {
  let nin = document.getElementById("NINQuota").value;
  let payment = document.getElementById("paymentQuota").value;
  let payment_status = document.getElementById("payment_status_Quota").value;
  let school_year = document.getElementById("anoLec").value;
  const statPagQuota = document.getElementById("statusPagQuota");
  if (nin.length < 9) {
    document.getElementById("passErroNIF").innerHTML =
      "O NIN tem de ter 17 caracteres";
    return;
  }
    const url = urlBase + '/' + (isEdit ? "editQuota" : "inserirPagamentoQuota");
  fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: isEdit ? "PUT" : "POST",
    body: `nin=${nin}&payment=${payment}&payment_status=${payment_status}&school_year=${school_year}`,
  })
    .then((response) => {
      return response.json().then((body) => {
        if (response.status == (isEdit ? 200 : 201)) {
          console.log(body.message);
          statPagQuota.innerHTML = body.message;
          document.getElementById("btnSubmitPagQuota").innerHTML = "Sucesso!";
          $('#table').bootstrapTable('refresh');
          $('#modalPagQuotas').modal('hide');																		  
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


function inserirEstadoDocumento(isEdit = false) {
  let nin = document.getElementById("NINDoc").value;
  let send = document.getElementById("send").value;
  let signature = document.getElementById("signature").value;
  let received = document.getElementById("received").value;
  const statDoc = document.getElementById("statusDoc");
  if (nin.length < 17) {
    document.getElementById("statusDoc").innerHTML =
      "O NIN tem de ter 17 caracteres";
    return;
  }
  const url = urlBase + '/' + (isEdit ? "editDocumento" : "inserirStatusDoc");
  fetch(url, {	  
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: isEdit ? "PUT" : "POST",
    body: `nin=${nin}&send=${send}&signature=${signature}&received=${received}`,
  })
    .then((response) => {
      return response.json().then((body) => {
        if (response.status == (isEdit ? 200 : 201)) {
          console.log(body.message);
          statDoc.innerHTML = body.message;
          document.getElementById("btnSubmitstatDoc").innerHTML = "Sucesso!";
          $('#table').bootstrapTable('refresh');
          $('#modalStatDoc').modal('hide');																	 
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


async function insereEscuteiro(isEdit = false, originalRow = undefined) {
  let upload;
  let files = document.getElementById("upload").files;
  // Se a lista de ficheiros para upload for maior que 0
  // (significa que há 1 ficheiro de associado para fazer upload)
  if (files.length > 0) {
    // Converte o ficheiro da posição 0 do array de ficheiros
    // numa string de base64 do binário do ficheiro
    upload = await getBase64(files[0]);
  } else {
      // Não existem ficheiros na lista
      // Vamos avaliar se estamos a editar um registo existente e se
      // estivermos tentamos usar o ficheiro carregado anteriormente
    upload = isEdit && originalRow && originalRow.upload.length > 0 ? originalRow.upload : "";
  }
  let nin = document.getElementById("nin").value;
  let admissiondate = document.getElementById("admissiondate").value;
  let section = document.getElementById("section").value;
  let name = document.getElementById("name").value;
  let citizencard = document.getElementById("citizencard").value;
  let personsex = document.getElementById("personsex").value;
  let nif = document.getElementById("nif").value;
  let birthdateAss = document.getElementById("birthdateAss").value;
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
  if (nin.length < 17) {
    console.log("estamos a entrar na função")
    document.getElementById("passErroNIF").innerHTML =
      "O NIN tem de ter 17 caracteres";
    return;
  }
  const url = urlBase + '/' + (isEdit ? "editEscuteiro" : "insereEscuteiro");
  fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: isEdit ? "PUT" : "POST",
    body: `upload=${encodeURIComponent(upload)}&nin=${nin}&admissiondate=${admissiondate}&section=${section}&name=${name}&citizencard=${citizencard}&personsex=${personsex}&nif=${nif}&birthdateAss=${birthdateAss}&nationality=${nationality}&naturalness=${naturalness}&address=${address}&vilage=${vilage}&zipcode=${zipcode}&city=${city}&district=${district}&mobilephone=${mobilephone}&phone=${phone}&email=${email}&school=${school}&profession=${profession}&fathername=${fathername}&fatherprofession=${fatherprofession}&fathermobilephone=${fathermobilephone}&fatheremail=${fatheremail}&mothername=${mothername}&motherprofession=${motherprofession}&mothermobilephone=${mothermobilephone}&motheremail=${motheremail}&sponsername=${sponsername}&sponserprofession=${sponserprofession}&sponsermobilephone=${sponsermobilephone}&sponsoremail=${sponsoremail}&healthnumber=${healthnumber}&allergies=${allergies}&description_allergies=${description_allergies}&regular_medication=${regular_medication}&dietary_restrictions=${dietary_restrictions}&other_health_problems=${other_health_problems}&data_processing=${data_processing}&health_data=${health_data}&data_voice_image=${data_voice_image}&social_networks__educating=${social_networks__educating}&email_educating=${email_educating}&collective_transport=${collective_transport}&data_sharing=${data_sharing}&all_health_data=${all_health_data}&name1=${name1}&parent1=${parent1}&mobile1=${mobile1}&name2=${name2}&parent2=${parent2}&mobile2=${mobile2}`,
  })
    .then((response) => {
      console.log("estamos a entrar no then")
      return response.json().then((body) => {
        if (response.status == (isEdit ? 200 : 201)) {
          console.log(body.message);
          statusInserirEscuteiro.innerHTML = body.message;
          document.getElementById("btnSubmitAssocciao").innerHTML = "Sucesso!";
          $('#table').bootstrapTable('refresh');
          $('#area').modal('hide');		
        }
      });
    })
    .catch((body) => {
      result = body.message;
      document.getElementById(
        "statusInserirEscuteiro"
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
  cleanAndRebuildTableTemplate();
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
    }, {
      field: 'valueEvent',
      title: 'Valor Total do Evento'
    }]
  })
}

async function listarEventosNaoPagos() {
  cleanAndRebuildTableTemplate();
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemEventosNaoPagos/`,
    columns: [{
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
    }, {
      field: 'valueEvent',
      title: 'Valor Total do Evento'
    }]
  })
}

function accoesFormatterQuotas (value, row, index) {
  return [
    '<a class="edit" href="javascript:void(0)" title="Edit">',
    '<i class="fa fa-edit"></i>',
    '</a>  ',
    '<a class="remove" href="javascript:void(0)" title="Remove">',
    '<i class="fa fa-trash"></i>',
    '</a>'
  ].join('')
} 

window.eventAcoesQuotas = {
  'click .edit': function (e, value, row, index) {
    chamaModalQuota(true, row);
  },
  'click .remove': function (e, value, row, index) {
    deleteQuota(row.nin);
    $('#table').bootstrapTable('refresh');
  }
}

function deleteQuota(nin) {
  fetch(`${urlBase}/deleteQuota`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "DELETE",
    body: `nin=${nin}`,
  })
}

async function listarQuotas() {
  cleanAndRebuildTableTemplate();
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemQuotas/`,
    columns: [{
      events: eventAcoesQuotas,
      field: 'acoes',
      formatter: accoesFormatterQuotas,
      title: 'Ações'
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

async function listarQuotasNaoPagas() {
  cleanAndRebuildTableTemplate();
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemQuotasNaoPagas/`,
    columns: [{
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


function accoesFormatterEspera(value, row, index) {
  return [
    '<a class="edit" href="javascript:void(0)" title="Edit">',
    '<i class="fa fa-edit"></i>',
    '</a>  ',
    '<a class="remove" href="javascript:void(0)" title="Remove">',
    '<i class="fa fa-trash"></i>',
    '</a>'
  ].join('')
} 

window.eventAcoesEspera = {
  'click .edit': function (e, value, row, index) {
    chamaModalEspera(true, row);
  },
  'click .remove': function (e, value, row, index) {
    deleteEspera(row.nif);
    $('#table').bootstrapTable('refresh');
  }
}

function deleteEspera(nif) {
  fetch(`${urlBase}/deleteEspera`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "DELETE",
    body: `nif=${nif}`,
  })
}

async function listarEspera() {
  cleanAndRebuildTableTemplate();
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemEspera/`,
    columns: [{
      events: eventAcoesEspera,
      field: 'acoes',
      formatter: accoesFormatterEspera,
	  title: 'Ações'
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
      field: 'birthdate',
      title: 'Data de Nascimento'
    }]
  })
}

function accoesFormatterDocumento (value, row, index) {
  return [
    '<a class="edit" href="javascript:void(0)" title="Edit">',
    '<i class="fa fa-edit"></i>',
    '</a>  ',
    '<a class="remove" href="javascript:void(0)" title="Remove">',
    '<i class="fa fa-trash"></i>',
    '</a>'
  ].join('')
}

window.eventAcoesDocumento = {
  'click .edit': function (e, value, row, index) {
    chamaModalDoc(true, row);
  },
  'click .remove': function (e, value, row, index) {
    deleteDocumento(row.nin);
    $('#table').bootstrapTable('refresh');
  }
}

function deleteDocumento(nin) {
  fetch(`${urlBase}/deleteDocumento`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "DELETE",
    body: `nin=${nin}`,
  })
}

async function listarDocumentos() {
  cleanAndRebuildTableTemplate();
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemDocumentos/`,
    columns: [{
      events: eventAcoesDocumento,
      field: 'acoes',
      formatter: accoesFormatterDocumento,
      title: 'Ações'
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

async function listarDocumentosNaoAssinados() {
  cleanAndRebuildTableTemplate();
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemDocumentosNaoAssinados/`,
    columns: [{
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


function downloadFichaAssociado(row) {
  let a = document.createElement("a");
  a.href = row.upload;
  a.download = "FichaAssociado_"+row.nin+".pdf";
  a.click();
}

function accoesFormatterEscuteiros (value, row, index) {
  return [
    '<a class="edit" href="javascript:void(0)" title="Edit">',
    '<i class="fa fa-edit"></i>',
    '</a>  ',
    '<a class="remove" href="javascript:void(0)" title="Remove">',
    '<i class="fa fa-trash"></i>',
    '</a>',
    '<a class="download" href="javascript:void(0)" title="Download">',
    '<i class="fa fa-download"></i>',
    '</a>  '
  ].join('')
}

window.eventAcoesLobitos = {
  'click .edit': function (e, value, row, index) {
    chamaModalInsAss(true, row);
  },
  'click .remove': function (e, value, row, index) {
    deleteLobito(row.nin);
    $('#table').bootstrapTable('refresh');
  },
  'click .download': function (e, value, row, index) {
    downloadFichaAssociado(row);
  }
}

function deleteLobito(nin) {
  fetch(`${urlBase}/deleteLobito`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "DELETE",
    body: `nin=${nin}`,
  })
}

async function listarLobitos() {
  cleanAndRebuildTableTemplate();
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemLobitos/`,
    columns: [{
      events: eventAcoesLobitos,
      field: 'acoes',
      formatter: accoesFormatterEscuteiros,
      title: 'Ações'
    }, {
        field: 'nin',
        title: 'NIN'
      }, {
        field: 'admissiondate',
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
        field: 'birthdateAss',
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

window.eventAcoesExploradores = {
  'click .edit': function (e, value, row, index) {
    chamaModalInsAss(true, row);
  },
  'click .remove': function (e, value, row, index) {
    deleteExplorador(row.nin);
    $('#table').bootstrapTable('refresh');
  },
  'click .download': function (e, value, row, index) {
    downloadFichaAssociado(row);
  }
}

function deleteExplorador(nin) {
  fetch(`${urlBase}/deleteExplorador`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "DELETE",
    body: `nin=${nin}`,
  })
}


async function listarExploradores() {
  cleanAndRebuildTableTemplate();
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemExploradores/`,
    columns: [{
      events: eventAcoesExploradores,
      field: 'acoes',
      formatter: accoesFormatterEscuteiros,
      title: 'Ações'
    }, {
        field: 'nin',
        title: 'NIN'
      }, {
        field: 'admissiondate',
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
        field: 'birthdateAss',
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


window.eventAcoesPioneiros = {
  'click .edit': function (e, value, row, index) {
    chamaModalInsAss(true, row);
  },
  'click .remove': function (e, value, row, index) {
    deletePioneiro(row.nin);
    $('#table').bootstrapTable('refresh');
  },
  'click .download': function (e, value, row, index) {
    downloadFichaAssociado(row);
  }
}

function deletePioneiro(nin) {
  fetch(`${urlBase}/deletePioneiro`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "DELETE",
    body: `nin=${nin}`,
  })
}


async function listarPioneiros() {
  cleanAndRebuildTableTemplate();
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemPioneiros/`,
    columns: [{
      events: eventAcoesPioneiros,
      field: 'acoes',
      formatter: accoesFormatterEscuteiros,
      title: 'Ações'
    }, {
        field: 'nin',
        title: 'NIN'
      }, {
        field: 'admissiondate',
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
        field: 'birthdateAss',
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

function accoesFormatterCaminheiros (value, row, index) {
  return [
    '<a class="edit" href="javascript:void(0)" title="Edit">',
    '<i class="fa fa-edit"></i>',
    '</a>  ',
    '<a class="remove" href="javascript:void(0)" title="Remove">',
    '<i class="fa fa-trash"></i>',
    '</a>'
  ].join('')
}

window.eventAcoesCaminheiros = {
  'click .edit': function (e, value, row, index) {
    chamaModalInsAss(true, row);
  },
  'click .remove': function (e, value, row, index) {
    deleteCaminheiro(row.nin);
    $('#table').bootstrapTable('refresh');
  },
  'click .download': function (e, value, row, index) {
    downloadFichaAssociado(row);
  }
}

function deleteCaminheiro(nin) {
  fetch(`${urlBase}/deleteCaminheiro`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "DELETE",
    body: `nin=${nin}`,
  })
}

async function listarCaminheiros() {
  cleanAndRebuildTableTemplate();
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemCaminheiros/`,
    columns: [{
      events: eventAcoesCaminheiros,
      field: 'acoes',
      formatter: accoesFormatterEscuteiros,
      title: 'Ações'
    }, {
        field: 'nin',
        title: 'NIN'
      }, {
        field: 'admissiondate',
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
        field: 'birthdateAss',
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

function accoesFormatterSecretarios (value, row, index) {
  return [
    '<a class="edit" href="javascript:void(0)" title="Edit">',
    '<i class="fa fa-edit"></i>',
    '</a>  ',
    '<a class="remove" href="javascript:void(0)" title="Remove">',
    '<i class="fa fa-trash"></i>',
    '</a>'
  ].join('')
}

window.eventAcoesSecretarios = {
  'click .edit': function (e, value, row, index) {
    chamaModalRegistar(true, row);
  },
  'click .remove': function (e, value, row, index) {
    deleteSecretario(row.email);
    $('#table').bootstrapTable('refresh');
  }
}

function deleteSecretario(email) {
  fetch(`${urlBase}/deleteSecretario`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "DELETE",
    body: `email=${email}`,
  })
}

async function listarSecretarios() {
  cleanAndRebuildTableTemplate();
  $('#table').bootstrapTable({
    url: `${urlBase}/listagemSecretario/`,
    columns: [{
      events: eventAcoesSecretarios,
      field: 'acoes',
      formatter: accoesFormatterSecretarios,
      title: 'Ações'
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