require("dotenv").config();

const dbmySQL = require("../models/mysql"); // Define o MODEL mySQL
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res) {
  console.log("A autorizar...");
  const cookies = req.cookies;
  console.log("Cookies:");
  console.log(cookies);
  const token = cookies.jwt;
  if (token == null) {
    console.log("Token nula");
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.email = user;
  });
}

const nodemailer = require("nodemailer");
const { response } = require("express");

exports.verificaUtilizador = async (req, res) => {
  const confirmationCode = req.params.confirmationCode;
  dbmySQL
    .crUd_ativar(confirmationCode)
    .then(() => {
      const resposta = { message: "O utilizador está ativo!" };
      console.log(resposta);
      return res.send(resposta);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send({
        message: JSON.stringify(response),
      });
    });
};

// REGISTAR - cria um novo utilizador
exports.registar = async (req, res) => {
  console.log("Registar novo utilizador");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const email = req.body.email; //req.body.igualAouser.js
  const password = hashPassword;
  const nome = req.body.name;
  const section = req.body.section;
  dbmySQL
    .Crud_registar(email, password, nome, section)
    .then((dados) => {
      res.status(201).send({
        message:
          "Utilizador criado com sucesso",
      });
      console.log("Controller - utilizador registado: ");
      console.log(JSON.stringify(dados));
    })
    .catch((response) => {
      console.log("Registar Utilizador - O erro está aqui");
      console.log(response);
      return res.status(400).send({
        message: JSON.stringify(response),
      });
    });
};

// LOGIN - autentica um utilizador
exports.login = async (req, res) => {
  console.log("Autenticação de um utilizador");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const email = req.body.email;
  const password = hashPassword;
  dbmySQL
    .cRud_login(email) //
    .then(async (dados) => {
      if (await bcrypt.compare(req.body.password, dados.password)) {
        const user = { name: email };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: 2 * 60,
        });
        // res.setHeader('Set-Cookie','novoUser=true')
        res.cookie("jwt", accessToken, {
          maxAge: 1000 * 60 * 2,
          httpOnly: true,
        });

        res.cookie("sec", dados.section);

        // Escolher a página de acordo com a secção
        let pathToGo = "/";
        switch (dados.section) {
          case "Caminheiros":
            pathToGo = "/homepage.html";
            break;
          case "Lobitos":
            pathToGo = "/homepage.html";
            break;
          case "Pioneiros":
            pathToGo = "/homepage.html";
            break;
          case "Exploradores":
            pathToGo = "/homepage.html";
            break;
          case "Agrupamento":
            pathToGo = "/homepage.html";
            break;
          default:
            pathToGo = "/";
        }

        res.status(200).send({ user: email, path: pathToGo }); // aqui temos de enviar a token de autorização
        console.log("Resposta da consulta à base de dados: ");
        console.log(JSON.stringify(dados)); // para debug
      } else {
        console.log("Password incorreta");
        return res.status(401).send({ erro: "A senha não está correta!" });
      }
    })
    .catch((response) => {
      console.log("Controller:");
      console.log(response);
      return res.status(401).send({
        erro: response,
      });
    });
};



// CREATE - cria um novo registo
exports.create = (req, res) => {
  console.log("Create");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const data = req.body;
  dbmySQL.Crud(data); // C: Create
  const resposta = { message: "Criou um novo registo!" };
  console.log(resposta);
  return res.send(resposta);
};

// Envia todas os associados na lista de espera
exports.findAllListaEspera = (req, res) => {
  if (req.email != null) {
    // utilizador autenticado
    console.log(`FindAll - user: ${req.email.name}`);
    console.log("Mensagem de debug - listar associados na lista de espera");
    dbmySQL
      .cRud_allListaEspera() // R: Read
      .then((dados) => {
        res.send(dados);
        // console.log("Dados: " + JSON.stringify(dados)); // para debug
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: "Não há associados para mostrar!" });
      });
  }
};




// // Envia todos os associados
// exports.listaAssociados = (req, res) => {
//   const { section } = req.params
//   console.log("ListaAssociados");
//   console.log("Mensagem de debug - listar associados - section: " + section);
//   dbmySQL
//     .cRud_findAllAssociados(section)
//     .then((dados) => {
//       res.send(dados);
//     })
//     .catch((err) => {
//       return res
//         .status(400)
//         .send({ message: "Não há associados para mostrar!" });
//     });
// };


// // READ one - busca um item pelo id
// exports.findOne = async (req, res) => {
//   authenticateToken(req, res);
//   if (req.email != null) {
//     // utilizador autenticado
//     console.log("Find One by id");
//     console.log("Parâmetro: " + req.params.id);
//     //Deve implementar esta funcionalidade...
//     const id = req.params.id.substr(1); // faz substring a partir do segundo carater
//     dbmySQL
//       .cRud_id(id) // R: Read
//       .then((dados) => {
//         res.send(dados);
//         // console.log("Dados: " + JSON.stringify(dados)); // para debug
//       })
//       .catch((err) => {
//         return res
//           .status(400)
//           .send({ message: "Não há disciplinas para mostrar!" });
//       });
//   }
// };

// // READ key - busca os itens que contêm uma chave
// exports.findKey = (req, res) => {
//   authenticateToken(req, res);
//   if (req.email != null) {
//     // utilizador autenticado
//     console.log("Find key");
//     // Temos de eliminar o primeiro carater para obter a chave de pesquisa
//     // O primeiro carater é o ":"
//     const criteria = req.params.id.substr(1); // faz substring a partir do segundo carater
//     console.log("Critério: " + criteria);
//     dbmySQL
//       .cRud_key(criteria) // R: Read
//       .then((dados) => {
//         res.send(dados);
//         // console.log("Dados: " + JSON.stringify(dados)); // para debug
//       })
//       .catch((err) => {
//         return res.status(400).send({});
//       });
//   }
// };

exports.inserirEspera = async (req, res) => {
  console.log("Inserir novo associado");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const nome = req.body.name;
  const tlf = req.body.tlf;
  const nif = req.body.nif;
  const dtNasc = req.body.dtNasc
  dbmySQL
    .Crud_inserirListaEspera(nome, nif, tlf, dtNasc)
    .then((dados) => {
      res.status(201).send({
        message:
          "Utilizador adicionado com sucesso",
      });
      console.log(JSON.stringify(dados));
    })
    .catch((response) => {
      console.log(response);
      return res.status(400).send({
        message: JSON.stringify(response),
      });
    });
};

exports.inserirPagamentoEvento = async (req, res) => {
  console.log("Inserir novo pagamento");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const nin = req.body.nin;
  const event = req.body.event;
  const payment = req.body.payment;
  const payment_status = req.body.payment_status;
  dbmySQL
    .Crud_inserirPagamentoEvento(nin, event, payment, payment_status)
    .then((dados) => {
      res.status(201).send({
        message:
          "Pagamento adicionado com sucesso",
      });
      console.log(JSON.stringify(dados));
    })
    .catch((response) => {
      console.log("o erro está a inserção da bd")
      console.log(response);
      return res.status(400).send({
        message: JSON.stringify(response),
      });
    });
};


exports.inserirStatusDoc = async (req, res) => {
  console.log("Inserir estado do pagamento");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const nin = req.body.nin;
  const send = req.body.send;
  const assig = req.body.assig;
  const received = req.body.received;
  dbmySQL
    .Crud_inserirStatusDoc(nin, send, assig, received)
    .then((dados) => {
      res.status(201).send({
        message:
          "Pagamento adicionado com sucesso",
      });
      console.log(JSON.stringify(dados));
    })
    .catch((response) => {
      console.log("o erro está a inserção da bd")
      console.log(response);
      return res.status(400).send({
        message: JSON.stringify(response),
      });
    });
};


exports.inserirPagamentoQuota = async (req, res) => {
  console.log("Inserir novo pagamento");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const nin = req.body.nin;
  const payment = req.body.payment;
  const payment_status = req.body.payment_status;
  const school_year = req.body.school_year;
  dbmySQL
    .Crud_inserirPagamentoQuota(nin, payment, payment_status, school_year)
    .then((dados) => {
      res.status(201).send({
        message:
          "Pagamento adicionado com sucesso",
      });
      console.log(JSON.stringify(dados));
    })
    .catch((response) => {
      console.log("o erro está a inserção da bd")
      console.log(response);
      return res.status(400).send({
        message: JSON.stringify(response),
      });
    });
};

exports.inserirEscuteiro = async (req, res) => {
  console.log("Inserir novo escuteiro");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const nin = req.body.nin;
  const admissiondate = req.body.admissiondate;
  const section = req.body.section;
  const name = req.body.name;
  const citizencard = req.body.citizencard;
  const personsex = req.body.personsex;
  const nif = req.body.nif;
  const birthdate = req.body.birthdate;
  const nationality = req.body.nationality;
  const naturalness = req.body.naturalness;
  const address = req.body.address;
  const vilage = req.body.vilage;
  const zipcode = req.body.zipcode;
  const city = req.body.city;
  const district = req.body.district;
  const mobilephone = req.body.mobilephone;
  const phone = req.body.phone;
  const email = req.body.email;
  const school = req.body.school;
  const profession = req.body.profession;
  const fathername = req.body.fathername;
  const fatherprofession = req.body.fatherprofession;
  const fathermobilephone = req.body.fathermobilephone;
  const fatheremail = req.body.fatheremail;
  const mothername = req.body.mothername;
  const motherprofession = req.body.motherprofession;
  const mothermobilephone = req.body.mothermobilephone;
  const motheremail = req.body.motheremail;
  const sponsername = req.body.sponsername;
  const sponserprofession = req.body.sponserprofession;
  const sponsermobilephone = req.body.sponsermobilephone;
  const sponsoremail = req.body.sponsoremail;
  const healthnumber = req.body.healthnumber;
  const allergies = req.body.allergies;
  const description_allergies = req.body.description_allergies;
  const regular_medication = req.body.regular_medication;
  const dietary_restrictions = req.body.dietary_restrictions;
  const other_health_problems = req.body.other_health_problems;
  const data_processing = req.body.data_processing;
  const health_data = req.body.health_data;
  const data_voice_image = req.body.data_voice_image;
  const social_networks__educating = req.body.social_networks__educating;
  const email_educating = req.body.email_educating;
  const collective_transport = req.body.collective_transport;
  const data_sharing = req.body.data_sharing;
  const all_health_data = req.body.all_health_data;
  const name1 = req.body.name1;
  const parent1 = req.body.parent1;
  const mobile1 = req.body.mobile1;
  const name2 = req.body.name2;
  const parent2 = req.body.parent2;
  const mobile2 = req.body.mobile2;
  dbmySQL
    .Crud_inserirEscuteiro(nin, admissiondate, section, name, citizencard, personsex, nif, birthdate, nationality, naturalness, address, vilage, zipcode, city, district, mobilephone, phone, email, school, profession, fathername, fatherprofession, fathermobilephone, fatheremail, mothername, motherprofession, mothermobilephone, motheremail, sponsername, sponserprofession, sponsermobilephone, sponsoremail, healthnumber, allergies, description_allergies, regular_medication, dietary_restrictions, other_health_problems, data_processing, health_data, data_voice_image, social_networks__educating, email_educating, collective_transport, data_sharing, all_health_data, name1, parent1, mobile1, name2, parent2, mobile2)
    .then((dados) => {
      res.status(201).send({
        message:
          "Associado criado com sucesso",
      });
      console.log(JSON.stringify(dados));
    })
    .catch((response) => {
      console.log("inserir Associado - O erro está aqui");
      console.log(response);
      return res.status(400).send({
        message: JSON.stringify(response),
      });
    });
};


// Envia todas as disciplinas
exports.findAllDocs = (req, res) => {
  if (!req.body) {
    // utilizador autenticado
    console.log(`FindAll - user: ${req.email.name}`);
    console.log("Mensagem de debug - listar documentos");
    dbmySQL
      .cRud_findAllDocs() // R: Read
      .then((dados) => {
        res.send(dados);

      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: "Não há documentos para mostrar!" });
      });
  }
};


// Envia todos os eventos
exports.listaEventos = (req, res) => {
  dbmySQL
    .cRud_allListaEventos()
    .then((dados) => {
      res.send(dados);
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não há eventos para mostrar!" });
    });
};

// Envia todos as quotas
exports.listaQuotas = (req, res) => {
  dbmySQL
    .cRud_allListaQuotas()
    .then((dados) => {
      res.send(dados);
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não há quotas para mostrar!" });
    });
};

// Envia todos da lista de espera
exports.listaEspera = (req, res) => {
  dbmySQL
    .cRud_allListaEspera()
    .then((dados) => {
      res.send(dados);
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não há lista de espera para mostrar!" });
    });
};

// Envia todos da lista de espera
exports.listaDocumentos = (req, res) => {
  dbmySQL
    .cRud_allListaDocumentos()
    .then((dados) => {
      res.send(dados);
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não há lista de espera para mostrar!" });
    });
};

// Envia todos os Lobitos
exports.listaLobitos = (req, res) => {
  dbmySQL
    .cRud_allListaLobitos()
    .then((dados) => {
      res.send(dados);
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não há Lobitos para mostrar!" });
    });
};

// Envia todos os Exploradores
exports.listaExploradores = (req, res) => {
  dbmySQL
    .cRud_allListaExploradores()
    .then((dados) => {
      res.send(dados);
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não há Exploradores para mostrar!" });
    });
};

// Envia todos os Pioneiros
exports.listaPioneiros = (req, res) => {
  dbmySQL
    .cRud_allListaPioneiros()
    .then((dados) => {
      res.send(dados);
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não há Pioneiros para mostrar!" });
    });
};

// Envia todos os Caminheiros
exports.listaCaminheiros = (req, res) => {
  dbmySQL
    .cRud_allListaCaminheiros()
    .then((dados) => {
      res.send(dados);
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não há Caminheiros para mostrar!" });
    });
};

// Envia todos os Secratários
exports.listaSecretario = (req, res) => {
  dbmySQL
    .cRud_allListaSecratarios()
    .then((dados) => {
      res.send(dados);
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Não há Secretários para mostrar!" });
    });
};