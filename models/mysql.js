const mysql = require("mysql2/promise");
const config = require("../config");

function connect() {
  console.log("ver se tem erro")
  return new Promise((resolve, reject) => {
    if (!global.connection || global.connection.state == "disconnected") {
      mysql
        .createConnection(config.db)
        .then((connection) => {
          global.connection = connection;
          console.log("Nova conexão ao mySQL");
          resolve(connection);
        })
        .catch((error) => {
          console.log("Erro na ligação ao mySQL:");
          console.log(error);
          reject(error.code);
        });
    } else {
      connection = global.connection;
      resolve(connection);
    }
  });
}

function query(sql, params) {
  return new Promise((resolve, reject) => {
    connect() // Acionado quando fazemos uma query
      .then((conn) => {
        conn
          .execute(sql, params)
          .then(([result]) => {
            console.log("Model: Query");
            console.log(result);
            resolve(result);
          })
          .catch((error) => {
            reject(error.sqlMessage);
          });
      })
      .catch((error) => {
        console.log("Query:");
        console.log(error);
        reject(error);
      });
  });
}

exports.Crud_registar = (email, password, nome, section) => {
  // insere um novo utilizador
  return new Promise((resolve, reject) => {
    data = {
      //nometabela: nomedadonocodigo
      email: email,
      password: password,
      name: nome,
      section: section,
    };
    query(
      "INSERT INTO secretagrup (email,password,name,section) values (?,?,?,?)",
      [data.email,data.password,data.name,data.section]
    )
      .then((result) => {
        console.log("Model: Registo de utilizador: ");
        console.log(data);
        console.log(result);
        if (result.affectedRows != 1)
          reject("Model: Problema na inserção de novo registo");
        else resolve(result);
      })
    }
)};


// Retorna o utilizador e sua password encriptada
exports.cRud_login = (email) => {
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    query("SELECT email, password from secretagrup WHERE email=?", [email])
      .then((result) => {
        user = {};
        Object.keys(result).forEach(function (key) {
          user = result[key];
          console.log(user.email);
        });
        console.log("Model: Login: ");
        console.log(user);
        if (user.email != email) reject("Utilizador inexistente contacte a secretaria do Agrupamento");
        else resolve(user);
        //aqui colocar window.rederect = If user.section "Lobito" rede
      })
      .catch((error) => {
        console.log("Model: Problema no login:");
        console.log(error);
        reject("Problemas no Login");
      });
  });
};

// exports.cRud_all = () => {
//   return new Promise((resolve, reject) => {
//     // lê todos os registos
//     query("SELECT * from disciplinas")
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// exports.cRud_id = (id) => {
//   return new Promise((resolve, reject) => {
//     // busca os registos que contêm a chave
//     query("SELECT * FROM disciplinas WHERE id=?", [id])
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// exports.cRud_key = (criteria) => {
//   return new Promise((resolve, reject) => {
//     // busca os registos que contêm a chave
//     console.log("Model - criteria:")
//     console.log(criteria)
//     // OR docente LIKE '%' + ? + '%' OR curso LIKE '%' + ? + '%'
//     query(
//       "SELECT * FROM disciplinas WHERE ano=? OR disciplina LIKE CONCAT('%',?,'%') OR docente LIKE CONCAT('%',?,'%') OR curso LIKE CONCAT('%',?,'%')", [criteria,criteria,criteria,criteria])
//       .then((result) => {
//         console.log("Model - result:")
//         console.log(result)
//         if (Object.keys(result).length == 0) {
//           console.log("Model - sem resultados")
//           reject("Não posso mostrar disciplinas!");
//         } else {
//           resolve(result);
//         }
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
