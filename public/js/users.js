const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

const urlBase = "https://localhost:8888/homepage";
const modalLogin = document.getElementById("modalLogin");
const bsModalLogin = new bootstrap.Modal(modalLogin, (backdrop = "static")); // Pode passar opções
const btnModalLogin = document.getElementById("btnModalLogin");


modalLogin.addEventListener("shown.bs.modal", () => {
  document.getElementById("usernameLogin").focus();
});
btnModalLogin.addEventListener("click", () => {
  bsModalLogin.show();
});



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

function validaLogin() {
  let email = document.getElementById("usernameLogin").value; // email é validado pelo próprio browser
  let senha = document.getElementById("senhaLogin").value; // tem de ter uma senha
  if (senha.length < 1) {
    document.getElementById("passErroLogin").innerHTML =
      "Necessário preencher todos os campos";
    return;
  }
  if (email.length < 1) {
    document.getElementById("ErroLogin").innerHTML =
      "Necessário preencher todos os campos";
    return;
  }
  const statLogin = document.getElementById("statusLogin");
  fetch(`${urlBase}/login`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST", // o login não vai criar nada, só ver se o user existe e a pass está correta
    body: `email=${email}&password=${senha}`,
  })
    .then((response) => {
      return response.json().then((body) => {
        if (response.status == 200) {
          console.log(body.user);
          document.getElementById("statusLogin").innerHTML = "Sucesso!";
          document.getElementById("searchbtn").disabled = false;
          document.getElementById("searchkey").disabled = false;
          document.getElementById("btnLoginClose").click();
        } else {
          throw body;
        }
      });
    })
    .catch((body) => {
      result = body.message;
      document.getElementById(
        "statusLogin"
      ).innerHTML = `${result}`;
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

