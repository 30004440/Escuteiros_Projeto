const mysql = require("mysql2/promise");
const config = require("../config");

function connect() {
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

exports.Crud_inserirListaEspera = (nome, nif, tlf) => {
  console.log("entrou no mysql")
  return new Promise((resolve, reject) => {
    data = {
      //nometabela: nomedadonocodigo
      name: nome,
      nif: nif,
      tlf: tlf,
    };
    query(
      "INSERT INTO waitinglist (name, nif, tlf) values (?,?,?)",
      [data.name,data.nif,data.tlf]
    )
      .then((result) => {
        console.log(data);
        console.log(result);
        if (result.affectedRows != 1)
          reject("Model: Problema na inserção de novo registo");
        else resolve(result);
      })
      .catch((error) => {
        console.log("Erro na ligação ao mySQL:");
        console.log(error);
        reject(error);
      });
    }
)};

// Retorna o utilizador e sua password encriptada
exports.cRud_login = (email, section) => {
  return new Promise((resolve, reject) => {
    query("SELECT email, password, section from secretagrup WHERE email=?", [email])
      .then((result) => {
        user = {};
        Object.keys(result).forEach(function (key) {
          user = result[key];
          console.log(user.email);
          console.log(user.section);
        });
        console.log(user);
        if (user.email != email) reject("Utilizador inexistente contacte a secretaria do Agrupamento")
        else if (user.section == "Lob") { window.location.replace("https://google.com")
        resolve (user), mudarPagina()}
        //aqui colocar window.redirect = If user.section "Lobito" rede
      })
      .catch((error) => {
        console.log("Model: Problema no login:");
        console.log(error);
        reject("Problemas no Login");
      });
  });
};

function mudarPagina ()  {
  window.location.replace("https://google.com")
}


exports.ListaEspera = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos
    query("SELECT * from waitinglist")
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_allListaEspera = (nif) => {
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    query("SELECT * FROM waitinglist WHERE nif=?", [nif])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_findAllLobitos = (section) => {
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    query("SELECT * FROM associados WHERE section=?", [Lobitos])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_findAllExploradores = (category) => {
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    query("SELECT * FROM associados WHERE category=?", [2])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_findAllPioneiros = (category) => {
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    query("SELECT * FROM associados WHERE category=?", [3])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_findAllCaminheiros = (category) => {
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    query("SELECT * FROM associados WHERE category=?", [4])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// exports.Crud_inserirEscuteiro = (nin, name, citizencard, personsex, nif2, birthdate, nationality, naturalness, address, vilage, city, zipcode, district, mobilephone, phone, email, school, profession, nPai, profPai, telPai, emailPai, nMae, profMae, telMae, emailMae, nEncEdu, profEncEdu, telEncEdu, emailEncEdu, nUte, nOp, op1, op2, op3, op4, desAle, medReg, resAli, outSau) => {
//   // insere um novo escuteiro
//   return new Promise((resolve, reject) => {
//     data = {
//       //nometabela: nomedadonocodigo
//       nin : nin,
//       name : name,
//       citizencard : citizencard,
//       personsex : personsex,
//       nif : nif2,
//       birthdate : birthdate,
//       nationality : nationality,
//       naturalness : naturalness,
//       address : address,
//       vilage : vilage,
//       city : city,
//       zipcode : zipcode,
//       district : district,
//       mobilephone : mobilephone,
//       phone : phone,
//       email : email,
//       school : school,
//       profession : profession,
//       fathername : nPai,
//       fatherprofession : profPai,
//       fathermobilephone : telPai,
//       fatheremail : emailPai,
//       mothername : nMae,
//       motherprofession : profMae,
//       mothermobilephone : telMae,
//       motheremail : emailMae,
//       sponsername : nEncEdu,
//       sponserprofession : profEncEdu,
//       sponsermobilephone : telEncEdu,
//       sponsoremail : emailEncEdu,
      
//     };
//     query(
//       "INSERT INTO associados (nin, name, citizencard, personsex, nif, birthdate, nationality, naturalness, address, vilage, city, zipcode, district, mobilephone, phone, email, school, profession) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//       [data.nin, data.name, data.citizencard, data.personsex, data.nif, data.birthdate, data.nationality, data.naturalness, data.address, data.vilage, data.city, data.zipcode, data.district, data.mobilephone, data.phone, data.email, data.school, data.profession]
//       and 
//       "INSERT INTO associados (fathername, fatherprofession, fathermobilephone, fatheremail, mothername, motherprofession, mothermobilephone, motheremail, sponsername, sponserprofession, sponsermobilephone, sponsoremail) values (?,?,?,?,?,?,?,?,?,?,?,?)",
//       [data.fathername, data.fatherprofession, data.fathermobilephone, data.fatheremail, data.mothername, data.motherprofession, data.mothermobilephone, data.motheremail, data.sponsername, data.sponserprofession, data.sponsermobilephone, data.sponsoremail]
//       )
//       .then((result) => {
//         console.log(data);
//         console.log(result);
//         if (result.affectedRows != 1)
//           reject("Model: Problema na inserção de novo registo");
//         else resolve(result);
//       })
//     }
// )};

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
