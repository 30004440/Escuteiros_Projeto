require("dotenv").config();

const dbmySQL = require("../models/mysql"); // Define o MODEL mySQL
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { response } = require("express");


// function authenticateToken(req, res) {
//   console.log("A autorizar...");
//   const cookies = req.cookies;
//   console.log("Cookies:");
//   console.log(cookies);
//   // const authHeader = req.headers["authorization"];
//   const token = cookies.jwt; //authHeader && authHeader.split(" ")[1];
//   if (token == null) {
//     console.log("Token nula");
//     return res.sendStatus(401);
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.email = user;
//   });
// }

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
  const email = req.body.email;
  const password = hashPassword;
  const name = req.body.name;
  const section = req.body.section;
  dbmySQL
    .Crud_registar(email, password, name, section)
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
          expiresIn: 20 * 60,
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

// // CREATE - cria um novo registo
// exports.create = (req, res) => {
//   console.log("Create");
//   if (!req.body) {
//     return res.status(400).send({
//       message: "O conteúdo não pode ser vazio!",
//     });
//   }
//   const data = req.body;
//   dbmySQL.Crud(data); // C: Create
//   const resposta = { message: "Criou um novo registo!" };
//   console.log(resposta);
//   return res.send(resposta);
// };

// // Envia todas as disciplinas
// exports.findAll = (req, res) => {
//   authenticateToken(req, res);
//   if (req.email != null) {
//     // utilizador autenticado
//     console.log(`FindAll - user: ${req.email.name}`);
//     console.log("Mensagem de debug - listar disciplinas");
//     dbmySQL
//       .cRud_all() // R: Read
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
//         console.log("Controller - criteria error:")
//         console.log(err)
//         return res.status(400).send(err);
//       });
//   }
// };

// // UPDATE - atualiza o item com o id recebido
// exports.update = (req, res) => {};

// // DELETE one - elimina o item com o id recebido
// exports.delete = (req, res) => {};

// // DELETE all - elimina todos os itens
// exports.deleteAll = (req, res) => {};
