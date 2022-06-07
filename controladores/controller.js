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
      console.log("O erro está aqui");
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
        res.status(200).send({ user: email }); // aqui temos de enviar a token de autorização
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
        message: JSON.stringify(response),
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


// Envia todos os lobitos
exports.listaLobitos = (req, res) => {
  if (req.email != null) {
    // utilizador autenticado
    console.log(`FindAll - user: ${req.email.name}`);
    console.log("Mensagem de debug - lista dos lobitos");
    dbmySQL
      .cRud_findAllLobitos() // R: Read
      .then((dados) => {
        res.send(dados);
        // console.log("Dados: " + JSON.stringify(dados)); // para debug
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: "Não há lobitos para mostrar!" });
      });
  }
};

// Envia todos os exploradores
exports.findAllExploradores = (req, res) => {
  if (req.email != null) {
    // utilizador autenticado
    console.log(`FindAll - user: ${req.email.name}`);
    console.log("Mensagem de debug - lista dos lobitos");
    dbmySQL
      .cRud_findAllExploradores() // R: Read
      .then((dados) => {
        res.send(dados);
        // console.log("Dados: " + JSON.stringify(dados)); // para debug
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: "Não há lobitos para mostrar!" });
      });
  }
};

// Envia todos os pioneiros
exports.findAllPioneiros = (req, res) => {
  if (req.email != null) {
    // utilizador autenticado
    console.log(`FindAll - user: ${req.email.name}`);
    console.log("Mensagem de debug - lista dos lobitos");
    dbmySQL
      .cRud_findAllPioneiros() // R: Read
      .then((dados) => {
        res.send(dados);
        // console.log("Dados: " + JSON.stringify(dados)); // para debug
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: "Não há lobitos para mostrar!" });
      });
  }
};


// Envia todos os caminheiros
exports.findAllCaminheiros = (req, res) => {
  if (req.email != null) {
    // utilizador autenticado
    console.log(`FindAll - user: ${req.email.name}`);
    console.log("Mensagem de debug - lista dos lobitos");
    dbmySQL
      .cRud_findAllCaminheiros() // R: Read
      .then((dados) => {
        res.send(dados);
        // console.log("Dados: " + JSON.stringify(dados)); // para debug
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: "Não há lobitos para mostrar!" });
      });
  }
};


// READ one - busca um item pelo id
exports.findOne = async (req, res) => {
  authenticateToken(req, res);
  if (req.email != null) {
    // utilizador autenticado
    console.log("Find One by id");
    console.log("Parâmetro: " + req.params.id);
    //Deve implementar esta funcionalidade...
    const id = req.params.id.substr(1); // faz substring a partir do segundo carater
    dbmySQL
      .cRud_id(id) // R: Read
      .then((dados) => {
        res.send(dados);
        // console.log("Dados: " + JSON.stringify(dados)); // para debug
      })
      .catch((err) => {
        return res
          .status(400)
          .send({ message: "Não há disciplinas para mostrar!" });
      });
  }
};

// READ key - busca os itens que contêm uma chave
exports.findKey = (req, res) => {
  authenticateToken(req, res);
  if (req.email != null) {
    // utilizador autenticado
    console.log("Find key");
    // Temos de eliminar o primeiro carater para obter a chave de pesquisa
    // O primeiro carater é o ":"
    const criteria = req.params.id.substr(1); // faz substring a partir do segundo carater
    console.log("Critério: " + criteria);
    dbmySQL
      .cRud_key(criteria) // R: Read
      .then((dados) => {
        res.send(dados);
        // console.log("Dados: " + JSON.stringify(dados)); // para debug
      })
      .catch((err) => {
        return res.status(400).send({});
      });
  }
};

exports.inserirEspera = async (req, res) => {
  console.log("Inserir novo associado");
  if (!req.body) {
    return res.status(400).send({
      message: "O conteúdo não pode ser vazio!",
    });
  }
  const nome = req.body.name;
  const nif = req.body.nif;
  const tlf = req.body.tlf;
  dbmySQL
    .Crud_inserirListaEspera(nome, nif, tlf)
    .then((dados) => {
      res.status(201).send({
        message:
          "Associado criado com sucesso",
      });
      console.log(JSON.stringify(dados)); 
    })
    .catch((response) => {
      console.log("O erro está aqui");
      console.log(response);
      return res.status(400).send({
        message: JSON.stringify(response),
      });
    });
};


// exports.inserirEscuteiro = async (req, res) => {
//   console.log("Inserir novo escuteiro");
//   if (!req.body) {
//     return res.status(400).send({
//       message: "O conteúdo não pode ser vazio!",
//     });
//   }
//   const nin = req.body.nin;
//   const name = req.body.fname;
//   const citizencard = req.body.cc;
//   const personsex = req.body.genre;
//   const nif2 = req.body.nif2;
//   const birthdate = req.body.dtnasc;
//   const nationality = req.body.nac;
//   const naturalness = req.body.nat;
//   const address = req.body.mor;
//   const vilage = req.body.loc;
//   const city = req.body.conc;
//   const zipcode = req.body.codp;
//   const district = req.body.dist;
//   const mobilephone = req.body.tel;
//   const phone = req.body.telf;
//   const email = req.body.email1;
//   const school = req.body.hab;
//   const profession = req.body.prof;
//   const nPai = req.body.nPai;
//   const profPai = req.body.profPai;
//   const telPai = req.body.telPai;
//   const emailPai = req.body.emailPai;
//   const nMae = req.body.nMae;
//   const profMae = req.body.profMae;
//   const telMae = req.body.telMae;
//   const emailMae = req.body.emailMae;
//   const nEncEdu = req.body.nEncEdu;
//   const profEncEdu = req.body.profEncEdu;
//   const telEncEdu = req.body.telEncEdu;
//   const emailEncEdu = req.body.emailEncEdu;
//   const nUte = req.body.nUte;
//   const nOp = req.body.nOp;
//   const op1 = req.body.op1;
//   const op2 = req.body.op2;
//   const op3 = req.body.op3;
//   const op4 = req.body.op4;
//   const desAle = req.body.desAle;
//   const medReg = req.body.medReg;
//   const resAli = req.body.resAli;
//   const outSau = req.body.outSau;
//   const name1 = req.body.name1;
//   const pare = req.body.pare;
//   const tel1 = req.body.tel1;
//   const name2 = req.body.name2;
//   const pare1 = req.body.pare1;
//   const tel2 = req.body.tel2;
//   const cons1 = req.body.cons1;
//   const cons2 = req.body.cons2;
//   const cons3 = req.body.cons3;
//   const cons4 = req.body.cons4;
//   const cons5 = req.body.cons5;
//   const cons6 = req.body.cons6;
//   const cons7 = req.body.cons7;
//   const cons8 = req.body.cons8;
//   const cons9 = req.body.cons9;
//   dbmySQL
//     .Crud_inserirEscuteiro(nin, name, citizencard, personsex, nif2, birthdate, nationality, naturalness, address, vilage, city, zipcode, district, mobilephone, phone, email, school, profession, nPai, profPai, telPai, emailPai, nMae, profMae, telMae, emailMae, nEncEdu, profEncEdu, telEncEdu, emailEncEdu, nUte, nOp, op1, op2, op3, op4, desAle, medReg, resAli, outSau, name1, pare, tel1, name2, pare1, tel2, cons1, cons2, cons3, cons4, cons5, cons6, cons7, cons8, cons9)
//     .then((dados) => {
//       res.status(201).send({
//         message:
//           "Associado criado com sucesso",
//       });
//       console.log(JSON.stringify(dados)); 
//     })
//     .catch((response) => {
//       console.log("O erro está aqui");
//       console.log(response);
//       return res.status(400).send({
//         message: JSON.stringify(response),
//       });
//     });
// };