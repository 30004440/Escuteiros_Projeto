function validaRegisto() {
  let email = document.getElementById("usernameRegistar").value; // email é validado pelo próprio browser
  let senha = document.getElementById("senhaRegistar").value; // tem de ter uma senha
  const statReg = document.getElementById("statusRegistar");
  if (senha.length < 4) {
    document.getElementById("passErroLogin").innerHTML =
      "A senha tem de ter ao menos 4 carateres";
    return;
  }
    if (email.length < 1) {
    document.getElementById("ErroLogin").innerHTML =
      "Necessário preencher todos os campos";
    return;
  }
  fetch(`${urlBase}/registar`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: `email=${email}&password=${senha}`,
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
      ).innerHTML = `Pedido falhado: ${result}`;
      console.log("Catch:");
      console.log(result);
    });
}



function insereRegisto() {
  let nome = document.getElementById("nomeEspera").value;
  let nif = document.getElementById("nifEspera").value;
  let status = document.getElementById("statusEspera").value;
  fetch(`${urlBase}/inserirEspera`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: `nome=${nomeEspera}&nif=${nifEspera}&status=${statusEspera}`,
  })
    .then((response) => {
      return response.json().then((body) => {
        if (response.status == 201) {
          console.log(body.message);
          statReg.innerHTML = body.message;
          document.getElementById("btnSubmitListaEspera").innerHTML = "Sucesso!";
        }
      });
    })
    .catch((body) => {
      result = body.message;
      document.getElementById(
        "statusInserir"
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

// function insereEscuteiro() {
//   let nin = document.getElementById("nin").value;
//   let name = document.getElementById("fname").value;
//   let citizencard = document.getElementById("cc").value;
//   let personsex = document.getElementById("genre").value;
//   let nif2 = document.getElementById("nif2").value;
//   let birthdate = document.getElementById("dtnasc").value;
//   let nationality = document.getElementById("nac").value;
//   let naturalness = document.getElementById("nat").value;
//   let address = document.getElementById("mor").value;
//   let vilage = document.getElementById("loc").value;
//   let city = document.getElementById("conc").value;
//   let zipcode = document.getElementById("codp").value;
//   let district = document.getElementById("dist").value;
//   let mobilephone = document.getElementById("tel").value;
//   let phone = document.getElementById("telf").value;
//   let email = document.getElementById("email1").value;
//   let school = document.getElementById("hab").value;
//   let profession = document.getElementById("prof").value;
//   let nPai = document.getElementById("nPai").value;
//   let profPai = document.getElementById("profPai").value;
//   let telPai = document.getElementById("telPai").value;
//   let emailPai = document.getElementById("emailPai").value;
//   let nMae = document.getElementById("nMae").value;
//   let profMae = document.getElementById("profMae").value;
//   let telMae = document.getElementById("telMae").value;
//   let emailMae = document.getElementById("emailMae").value;
//   let nEncEdu = document.getElementById("nEncEdu").value;
//   let profEncEdu = document.getElementById("profEncEdu").value;
//   let telEncEdu = document.getElementById("telEncEdu").value;
//   let emailEncEdu = document.getElementById("emailEncEdu").value;
//   let nUte = document.getElementById("nUte").value;
//   let nOp = document.getElementById("nOp").value;
//   let op1 = document.getElementById("op1").value;
//   let op2 = document.getElementById("op2").value;
//   let op3 = document.getElementById("op3").value;
//   let op4 = document.getElementById("op4").value;
//   let desAle = document.getElementById("desAle").value;
//   let medReg = document.getElementById("medReg").value;
//   let resAli = document.getElementById("resAli").value;
//   let outSau = document.getElementById("outSau").value;
//   let name1 = document.getElementById("name1").value;
//   let pare = document.getElementById("pare").value;
//   let tel1 = document.getElementById("tel1").value;
//   let name2 = document.getElementById("name2").value;
//   let pare1 = document.getElementById("pare1").value;
//   let tel2 = document.getElementById("tel2").value;
//   let cons1 = document.getElementById("cons1").value;
//   let cons2 = document.getElementById("cons2").value;
//   let cons3 = document.getElementById("cons3").value;
//   let cons4 = document.getElementById("cons4").value;
//   let cons5 = document.getElementById("cons5").value;
//   let cons6 = document.getElementById("cons6").value;
//   let cons7 = document.getElementById("cons7").value;
//   let cons8 = document.getElementById("cons8").value;
//   let cons9 = document.getElementById("cons9").value;


//   fetch(`${urlBase}/insereEscuteiro`, {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     method: "POST",
//     body: `
//     nin=${nin}&name=${fname}&citizencard=${cc}&personsex=${genre}&nif2=${nif2}&birthdate=${dtnasc}&nationality=${nac}&naturalness=${nat}&address=${mor}&vilage=${loc}&city=${conc}&zipcode=${codp}&district=${"dist"}&mobilephone=${tel}&phone=${telf}&email=${email1}&school=${hab}&profession=${prof}&nPai=${nPai}&profPai=${profPai}&telPai=${telPai}&emailPai=${emailPai}&nMae=${nMae}&profMae=${profMae}&telMae=${telMae}&emailMae=${emailMae}&nEncEdu=${nEncEdu}&profEncEdu=${profEncEdu}&telEncEdu=${telEncEdu}&emailEncEdu=${emailEncEdu}&nUte=${nUte}&nOp=${nOp}&op1=${op1}&op2=${op2}&op3=${op3}&op4=${op4}&desAle=${desAle}&medReg=${medReg}&resAli=${resAli}&outSau=${outSau}&name1=${name1}&pare=${pare}&tel1=${tel1}&name2=${name2}&pare1=${pare1}&tel2=${tel2}&cons1=${cons1}&cons2=${cons2}&cons3=${cons3}&cons4=${cons4}&cons5=${cons5}&cons6=${cons6}&cons7=${cons7}&cons8=${cons8}&cons9=${cons9}`,

//   })
//     .then((response) => {
//       return response.json().then((body) => {
//         if (response.status == 201) {
//           console.log(body.message);
//           statReg.innerHTML = body.message;
//           document.getElementById("btnSubmitAssocciao").innerHTML = "Sucesso!";
//         }
//       });
//     })
//     .catch((body) => {
//       result = body.message;
//       document.getElementById(
//         "statusInserirAssociacao"
//       ).innerHTML = `${result}`;
//       console.log("Catch:");
//       console.log(result);
//     });
// }



async function listaLobitos() {
  const response = await fetch("/controller/listarLobitos");
  const data = await response.json();
  const listaLobitos = document.getElementById("listarLobitos");

  for (lobito of data) {
    const root = document.createElement("div");
    //const do campoAApareserNaPagina = document.createElement("div");
    const nin = document.createElement("div");
    const dataAdmissao = document.createElement("div");
    const seccao = document.createElement("div");
    const nome = document.createElement(`div`);
    const cc = document.createElement("div");
    const genero = document.createElement("div");
    const nif = document.createElement("div");
    const dataNascimento = document.createElement("div");
    const nacionalidade = document.createElement("div");
    const naturalidade = document.createElement("div");
    const morada = document.createElement("div");
    const localidade = document.createElement("div");
    const codigoPostal = document.createElement("div");
    const concelho = document.createElement("div");
    const distrito = document.createElement("div");
    const telemovel = document.createElement("div");
    const telefone = document.createElement("div");
    const email = document.createElement("div");
    const habilitacoes = document.createElement("div");
    const profissao = document.createElement("div");
    const nomePai = document.createElement("div");
    const profPai = document.createElement("div");
    const telePai = document.createElement("div");
    const emailPai = document.createElement("div");
    const nomeMae = document.createElement("div");
    const profMae = document.createElement("div");
    const teleMae = document.createElement("div");
    const emailMae = document.createElement("div");  
    const nomeEncEdu = document.createElement("div");
    const profEncEdu = document.createElement("div");
    const teleEncEdu = document.createElement("div");
    const emailEncEdu = document.createElement("div");
    const nUtente = document.createElement("div");
    const opAssinaladas = document.createElement("div");
    const descAlergias = document.createElement("div");
    const medRegular = document.createElement("div");
    const resAlimen = document.createElement("div");
    const outProblSaude = document.createElement("div");
    const cons1 = document.createElement("div");
    const cons2 = document.createElement("div");
    const cons3 = document.createElement("div");
    const cons4 = document.createElement("div");
    const cons5 = document.createElement("div");
    const cons6 = document.createElement("div");
    const cons7 = document.createElement("div");
    const cons8 = document.createElement("div");
    const parentesco1 = document.createElement("div");
    const telemovel1 = document.createElement("div");
    const nome2 = document.createElement("div");
    const parentesco2 = document.createElement("div");
    const telemovel2 = document.createElement("div");
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