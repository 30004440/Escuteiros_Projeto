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
    body: `name=${nome}&nif=${nif}&tlf=${tlf}`,
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

async function listaResultadosEspera() {
  const criteria = document.getElementById("searchkey").value;
  console.log("Critério: " + criteria);

  let url = urlBase + "/listagemEspera";
  const token = localStorage.token;
  console.log(token);

  if (id != "") {
    url = url + "/:" + id;
  } else if (criteria != "") {
    url = url + "/key/:" + criteria;
  }

  console.log("URL: " + url);
  const myInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: `Bearer ${token}`,
    },
  };
  const myRequest = new Request(url, myInit);
}



async function listaExploradores() {
  const criteria = document.getElementById("searchkey").value;
  console.log("Critério: " + criteria);

  let url = urlBase + "/listagemExploradores";
  const token = localStorage.token;
  console.log(token);

  if (id != "") {
    url = url + "/:" + id;
  } else if (criteria != "") {
    url = url + "/key/:" + criteria;
  }

  console.log("URL: " + url);
  const myInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: `Bearer ${token}`,
    },
  };
  const myRequest = new Request(url, myInit);
}


async function listaPioneiros() {
  const criteria = document.getElementById("searchkey").value;
  console.log("Critério: " + criteria);

  let url = urlBase + "/listagemPioneiros";
  const token = localStorage.token;
  console.log(token);

  if (id != "") {
    url = url + "/:" + id;
  } else if (criteria != "") {
    url = url + "/key/:" + criteria;
  }

  console.log("URL: " + url);
  const myInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: `Bearer ${token}`,
    },
  };
  const myRequest = new Request(url, myInit);
}


async function listaCaminheiros() {
  const criteria = document.getElementById("searchkey").value;
  console.log("Critério: " + criteria);

  let url = urlBase + "/listagemCaminheiros";
  const token = localStorage.token;
  console.log(token);

  if (id != "") {
    url = url + "/:" + id;
  } else if (criteria != "") {
    url = url + "/key/:" + criteria;
  }

  console.log("URL: " + url);
  const myInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Authorization: `Bearer ${token}`,
    },
  };
  const myRequest = new Request(url, myInit);
}

function insereEscuteiro() {
let nin = document.getElementById("nin").value;
let admission = document.getElementById("admission").value;
let section = document.getElementById("section").value;
let name = document.getElementById("name").value;
let citizencard = document.getElementById("citizencard").value;
let personsex = document.getElementById("personsex").value;
let nif = document.getElementById("nif").value;
let birth = document.getElementById("birth").value;
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
let allergies = document.getElementById("allergies").value;
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
  if (nin.length < 9) {
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
    body: `
    nin=${nin}&admission=${admission}&section=${section}&name=${name}&citizencard=${citizencard}&personsex=${personsex}&nif=${nif}&birth=${birth}&nationality=${nationality}&naturalness=${naturalness}&address=${address}&vilage=${vilage}&zipcode=${zipcode}&city=${city}&district=${district}&mobilephone=${mobilephone}&phone=${phone}&email=${email}&school=${school}&profession=${profession}&fathername=${fathername}&fatherprofession=${fatherprofession}&fathermobilephone=${fathermobilephone}&fatheremail=${fatheremail}&mothername=${mothername}&motherprofession=${motherprofession}&mothermobilephone=${mothermobilephone}&motheremail=${motheremail}&sponsername=${sponsername}&sponserprofession=${sponserprofession}&sponsermobilephone=${sponsermobilephone}&sponsoremail=${sponsoremail}&healthnumber=${healthnumber}&allergies=${allergies}&description_allergies=${description_allergies}&regular_medication=${regular_medication}&dietary_restrictions=${dietary_restrictions}&other_health_problems=${other_health_problems}&data_processing=${data_processing}&health_data=${health_data}&data_voice_image=${data_voice_image}&social_networks__educating=${social_networks__educating}&email_educating=${email_educating}&collective_transport=${collective_transport}&data_sharing=${data_sharing}&all_health_data=${all_health_data}&name1=${name1}&parent1=${parent1}&mobile1=${mobile1}&name2=${name2}&parent2=${parent2}&mobile2=${mobile2}`,
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


async function listaLobitos() {
  const response = await fetch(`${urlBase}/listagemLobitos`);
  const data = await response.json();
  const listaLobitos = document.getElementById("listarLobitos");

  for (lobito of data) {
    const root = document.createElement(`div`);
    //const do campoAApareserNaPagina = document.createElement("div");
    const nin = document.createElement(`div`);
    const dataAdmissao = document.createElement(`div`);
    const seccao = document.createElement(`div`);
    const nome = document.createElement(`div`);
    const cc = document.createElement(`div`);
    const genero = document.createElement(`div`);
    const nif = document.createElement(`div`);
    const dataNascimento = document.createElement(`div`);
    const nacionalidade = document.createElement(`div`);
    const naturalidade = document.createElement(`div`);
    const morada = document.createElement(`div`);
    const localidade = document.createElement(`div`);
    const codigoPostal = document.createElement(`div`);
    const concelho = document.createElement(`div`);
    const distrito = document.createElement(`div`);
    const telemovel = document.createElement(`div`);
    const telefone = document.createElement(`div`);
    const email = document.createElement(`div`);
    const habilitacoes = document.createElement(`div`);
    const profissao = document.createElement(`div`);
    const nomePai = document.createElement(`div`);
    const profPai = document.createElement(`div`);
    const telePai = document.createElement(`div`);
    const emailPai = document.createElement(`div`);
    const nomeMae = document.createElement(`div`);
    const profMae = document.createElement(`div`);
    const teleMae = document.createElement(`div`);
    const emailMae = document.createElement(`div`);  
    const nomeEncEdu = document.createElement(`div`);
    const profEncEdu = document.createElement(`div`);
    const teleEncEdu = document.createElement(`div`);
    const emailEncEdu = document.createElement(`div`);
    const nUtente = document.createElement(`div`);
    const opAssinaladas = document.createElement(`div`);
    const descAlergias = document.createElement(`div`);
    const medRegular = document.createElement(`div`);
    const resAlimen = document.createElement(`div`);
    const outProblSaude = document.createElement(`div`);
    const cons1 = document.createElement(`div`);
    const cons2 = document.createElement(`div`);
    const cons3 = document.createElement(`div`);
    const cons4 = document.createElement(`div`);
    const cons5 = document.createElement(`div`);
    const cons6 = document.createElement(`div`);
    const cons7 = document.createElement(`div`);
    const cons8 = document.createElement(`div`);
    const parentesco1 = document.createElement(`div`);
    const telemovel1 = document.createElement(`div`);
    const nome2 = document.createElement(`div`);
    const parentesco2 = document.createElement(`div`);
    const telemovel2 = document.createElement(`div`);
    //ApareserNaPagina.textContent = `Nome do Campo: ${lobito.campodaBD}`;

    nin.textContent =`Nome do Campo: ${lobito.nin}`;
    dataAdmissao.textContent =`Nome do Campo: ${lobito.admissiondate}`;
    seccao.textContent =`Nome do Campo: ${lobito.section}`;
    nome.textContent =`Nome do Campo: ${lobito.name}`;
    cc.textContent =`Nome do Campo: ${lobito.citiziencard}`;
    genero.textContent =`Nome do Campo: ${lobito.personsex}`;
    nif.textContent =`Nome do Campo: ${lobito.nif}`;
    dataNascimento.textContent =`Nome do Campo: ${lobito.birthdate}`;
    nacionalidade.textContent =`Nome do Campo: ${lobito.nationality}`;
    naturalidade.textContent =`Nome do Campo: ${lobito.naturalness}`;
    morada.textContent =`Nome do Campo: ${lobito.address}`;
    localidade.textContent =`Nome do Campo: ${lobito.vilage}`;
    codigoPostal.textContent =`Nome do Campo: ${lobito.zipcode}`;
    concelho.textContent =`Nome do Campo: ${lobito.city}`;
    distrito.textContent =`Nome do Campo: ${lobito.district}`;
    telemovel.textContent =`Nome do Campo: ${lobito.mobilephone}`;
    telefone.textContent =`Nome do Campo: ${lobito.phone}`;
    email.textContent =`Nome do Campo: ${lobito.email}`;
    habilitacoes.textContent =`Nome do Campo: ${lobito.school}`;
    profissao.textContent =`Nome do Campo: ${lobito.profession}`;
    nomePai.textContent =`Nome do Campo: ${lobito.fathername}`;
    profPai.textContent =`Nome do Campo: ${lobito.fatherprofession}`;
    telePai.textContent =`Nome do Campo: ${lobito.fathermobilephone}`;
    emailPai.textContent =`Nome do Campo: ${lobito.fatheremail}`;
    nomeMae.textContent =`Nome do Campo: ${lobito.mothername}`;
    profMae.textContent =`Nome do Campo: ${lobito.motherprofession}`;
    teleMae.textContent =`Nome do Campo: ${lobito.mothermobilephone}`;
    emailMae.textContent =`Nome do Campo: ${lobito.motheremail}`;  
    nomeEncEdu.textContent =`Nome do Campo: ${lobito.sponsername}`;
    profEncEdu.textContent =`Nome do Campo: ${lobito.sponserprofession}`;
    teleEncEdu.textContent =`Nome do Campo: ${lobito.sponsermobilephone}`;
    emailEncEdu.textContent =`Nome do Campo: ${lobito.sponseremail}`;
    nUtente.textContent =`Nome do Campo: ${lobito.healthnumber}`;
    opAssinaladas.textContent =`Nome do Campo: ${lobito.allergies}`;
    descAlergias.textContent =`Nome do Campo: ${lobito.description_allergies}`;
    medRegular.textContent =`Nome do Campo: ${lobito.regular_medication}`;
    resAlimen.textContent =`Nome do Campo: ${lobito.diatary_restrictions}`;
    outProblSaude.textContent =`Nome do Campo: ${lobito.other_health_problems}`;
    cons1.textContent =`Nome do Campo: ${lobito.data_processing}`;
    cons2.textContent =`Nome do Campo: ${lobito.health_data}`;
    cons3.textContent =`Nome do Campo: ${lobito.data_voice_image}`;
    cons4.textContent =`Nome do Campo: ${lobito.social_networks_educating}`;
    cons5.textContent =`Nome do Campo: ${lobito.email_educationg}`;
    cons6.textContent =`Nome do Campo: ${lobito.collective_transport}`;
    cons8.textContent =`Nome do Campo: ${lobito.data_sharing}`;
    cons9.textContent =`Nome do Campo: ${lobito.all_health_data}`;
    nome1.textContent =`Nome do Campo: ${lobito.name1}`;
    parentesco1.textContent =`Nome do Campo: ${lobito.parent1}`;
    telemovel1.textContent =`Nome do Campo: ${lobito.mobile1}`;
    nome2.textContent =`Nome do Campo: ${lobito.name2}`;
    parentesco2.textContent =`Nome do Campo: ${lobito.parent2}`;
    telemovel2.textContent =`Nome do Campo: ${lobito.mobile2}`;
    root.append(nin, dataAdmissao, seccao, nome, cc, genero, nif, dataNascimento, nacionalidade, naturalidade, morada, localidade, codigoPostal, concelho, distrito, telemovel, telefone, email, habilitacoes, profissao, nomePai, profPai, telePai, emailPai, nomeMae, profMae, teleMae, emailMae, nomeEncEdu, profEncEdu, teleEncEdu, emailEncEdu, nUtente, opAssinaladas, descAlergias, medRegular, resAlimen, outProblSaude, cons1, cons2, cons3, cons4, cons5, cons6, cons8, cons9, nome1, parentesco1, telemovel1, nome2, parentesco2, telemovel2);
    listaLobitos.append(root);
  }
  console.log(listaLobitos);
}