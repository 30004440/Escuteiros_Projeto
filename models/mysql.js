const mysql = require("mysql2/promise");
const config = require("../config");

function connect() {
  return new Promise((resolve, reject) => {
    if (!global.connection || global.connection.state == "disconnected") {
      mysql
        .createConnection(process.env.JAWSBD_URL)
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

exports.Crud_inserirListaEspera = (nome, nif, tlf, birthdate) => {
  console.log("entrou no mysql")
  return new Promise((resolve, reject) => {
    data = {
      //nometabela: nomedadonocodigo
      name: nome,
      nif: nif,
      tlf: tlf,
      birthdate: birthdate,
    };
    query(
      "INSERT INTO waitinglist (name, nif, tlf, birthdate) values (?,?,?,?)",
      [data.name,data.nif,data.tlf, data.birthdate]
    )
      .then((result) => {
        console.log(data);
        console.log(result);
        if (result.affectedRows != 1)
          reject("Model: Problema na inserção de novo registo");
        else resolve(result);
      })
      .catch((error) => {
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
        else {
          resolve(user)
        }
      })
      .catch((error) => {
        console.log("Model: Problema no login:");
        console.log(error);
        reject("Problemas no Login");
      });
  });
};

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



exports.Crud_inserirEscuteiro = (upload, nin, admissiondate, section, name, citizencard, personsex, nif, birthdateAss, nationality, naturalness, address, vilage, zipcode, city, district, mobilephone, phone, email, school, profession, fathername, fatherprofession, fathermobilephone, fatheremail, mothername, motherprofession, mothermobilephone, motheremail, sponsername, sponserprofession, sponsermobilephone, sponsoremail, healthnumber, allergies, description_allergies, regular_medication, dietary_restrictions, other_health_problems, data_processing, health_data, data_voice_image, social_networks__educating, email_educating, collective_transport, data_sharing, all_health_data, name1, parent1, mobile1, name2, parent2, mobile2) => {
  // insere um novo escuteiro
  return new Promise((resolve, reject) => {
    data = {
      //nometabela: nomedadonocodigo
      upload: upload,
      nin : nin,
      admissiondate : admissiondate,
      section : section,
      name : name,
      citizencard : citizencard,
      personsex : personsex,
      nif : nif,
      birthdateAss : birthdateAss,
      nationality : nationality,
      naturalness : naturalness,
      address : address,
      vilage : vilage,
      zipcode : zipcode,
      city : city,
      district : district,
      mobilephone : mobilephone,
      phone : phone,
      email : email,
      school : school,
      profession : profession,
      fathername : fathername,
      fatherprofession : fatherprofession,
      fathermobilephone : fathermobilephone,
      fatheremail : fatheremail,
      mothername : mothername,
      motherprofession : motherprofession,
      mothermobilephone : mothermobilephone,
      motheremail : motheremail,
      sponsername : sponsername,
      sponserprofession : sponserprofession,
      sponsermobilephone : sponsermobilephone,
      sponsoremail : sponsoremail,
      healthnumber : healthnumber,
      allergies : allergies,
      description_allergies : description_allergies,
      regular_medication : regular_medication,
      dietary_restrictions : dietary_restrictions,
      other_health_problems : other_health_problems,
      data_processing : data_processing,
      health_data : health_data,
      data_voice_image : data_voice_image,
      social_networks__educating : social_networks__educating,
      email_educating : email_educating,
      collective_transport : collective_transport,
      data_sharing : data_sharing,
      all_health_data : all_health_data,
      name1 : name1,
      parent1 : parent1,
      mobile1 : mobile1,
      name2 : name2,
      parent2 : parent2,
      mobile2 : mobile2,
    };
    query(
      "INSERT INTO associados (upload, nin, admissiondate, section, name, citizencard, personsex, nif, birthdateAss, nationality, naturalness, address, vilage, zipcode, city, district, mobilephone, phone, email, school, profession, fathername, fatherprofession, fathermobilephone, fatheremail, mothername, motherprofession, mothermobilephone, motheremail, sponsername, sponserprofession, sponsermobilephone, sponsoremail, healthnumber, allergies, description_allergies, regular_medication, dietary_restrictions, other_health_problems, data_processing, health_data, data_voice_image, social_networks__educating, email_educating, collective_transport, data_sharing, all_health_data, name1, parent1, mobile1, name2, parent2, mobile2) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [data.upload, data.nin, data.admissiondate, data.section, data.name, data.citizencard, data.personsex, data.nif, data.birthdateAss, data.nationality, data.naturalness, data.address, data.vilage, data.zipcode, data.city, data.district, data.mobilephone, data.phone, data.email, data.school, data.profession, data.fathername, data.fatherprofession, data.fathermobilephone, data.fatheremail, data.mothername, data.motherprofession, data.mothermobilephone, data.motheremail, data.sponsername, data.sponserprofession, data.sponsermobilephone, data.sponsoremail, data.healthnumber, data.allergies, data.description_allergies, data.regular_medication, data.dietary_restrictions, data.other_health_problems, data.data_processing, data.health_data, data.data_voice_image, data.social_networks__educating, data.email_educating, data.collective_transport, data.data_sharing, data.all_health_data, data.name1, data.parent1, data.mobile1, data.name2, data.parent2, data.mobile2]
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



exports.Crud_inserirPagamentoEvento = (nin, event, payment, payment_status, valueEvent) => {
  console.log("entrou no mysql")
  return new Promise((resolve, reject) => {
    data = {
      //nometabela: nomedadonocodigo 
      nin: nin,
      event: event,
      payment: payment,
      payment_status: payment_status,
      valueEvent: valueEvent
    };
    query(
      "INSERT INTO events (nin, event, payment, payment_status, valueEvent) values (?,?,?,?,?)",
      [data.nin, data.event, data.payment, data.payment_status, data.valueEvent]
    )
      .then((result) => {
        console.log(data);
        console.log(result);
        if (result.affectedRows != 1)
          reject("Model: Problema na inserção de novo pagamento");
        else resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    }
)};


exports.Crud_inserirPagamentoQuota = (nin, payment, payment_status, school_year) => {
  console.log("entrou no mysql")
  return new Promise((resolve, reject) => {
    data = {
      //nometabela: nomedadonocodigo 
      nin: nin,
      payment: payment,
      payment_status: payment_status,
      school_year : school_year
    };
    query(
      "INSERT INTO quota (nin, payment, payment_status, school_year) values (?,?,?,?)",
      [data.nin, data.payment, data.payment_status, data.school_year]
    )
      .then((result) => {
        console.log(data);
        console.log(result);
        if (result.affectedRows != 1)
          reject("Model: Problema na inserção de novo pagamento");
        else resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    }
)};


exports.Crud_inserirStatusDoc = (nin, send, signature, received) => {
  console.log("entrou no mysql")
  return new Promise((resolve, reject) => {
    data = {
      //nometabela: nomedadonocodigo 
      nin: nin,
      send: send,
      signature: signature,
      received : received
    };
    query(
      "INSERT INTO statusdocument (nin, send, signature, received) values (?,?,?,?)",
      [data.nin, data.send, data.signature, data.received]
    )
      .then((result) => {
        console.log(data);
        console.log(result);
        if (result.affectedRows != 1)
          reject("Model: Problema na inserção do status dos documentos");
        else resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    }
)};



exports.cRud_allListaEventos = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos
    query("SELECT * from events")
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_allListaEventosNaoPagos = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos de eventos não pagas
    query("SELECT * from events where payment_status IN ( 'Não Pago', 'Pago Parcialmente' )")
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


exports.cRud_allListaQuotas = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos
    query("SELECT * from quota")
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_allListaQuotasNaoPagas = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos de quotas não pagas
    query("SELECT * from quota where payment_status IN ( 'Não Pago', 'Pago Parcialmente' )")
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_allListaEspera = () => {
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

exports.cRud_allListaDocumentos = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos
    query("SELECT * from statusdocument")
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_allListaDocumentosNaoAssinados = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos de documentos não assinados
    query("SELECT * from statusdocument where signature = 'Não Assinado'")
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_allListaLobitos = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos
    query("SELECT * from associados where section = 'Lobitos'")
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_allListaExploradores = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos
    query("SELECT * from associados where section = 'Exploradores'")
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_allListaPioneiros = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos
    query("SELECT * from associados where section = 'Pioneiros'")
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_allListaCaminheiros = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos
    query("SELECT * from associados where section = 'Caminheiros'")
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_allListaSecratarios = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos
    query("SELECT * from secretagrup")
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.cRud_DeleteEvento = (nin) => {
  return new Promise((resolve, reject) => {
    query("DELETE FROM events WHERE nin=?", [nin] )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.Crud_EditarEvento = (nin, event, payment, payment_status, valueEvent) => {
  console.log("entrou no mysql")
  return new Promise((resolve, reject) => {
    data = {
      nin: nin,
      event: event,
      payment: payment,
      payment_status: payment_status, 
      valueEvent: valueEvent
    };
    query(
      "UPDATE events set event = ?, payment = ?, payment_status = ?, valueEvent = ? where nin = ?",
      [data.event, data.payment, data.payment_status, data.valueEvent, data.nin]
    )
      .then((result) => {
        console.log(data);
        console.log(result);
        if (result.affectedRows != 1)
          reject("Model: Problema na edição de novo evento");
        else resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    }
)};

exports.cRud_DeleteQuota = (nin) => {
  return new Promise((resolve, reject) => {
    query("DELETE FROM quota WHERE nin=?", [nin] )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.Crud_EditarQuota = (nin, payment, payment_status, school_year) => {
  console.log("entrou no mysql")
  return new Promise((resolve, reject) => {
    data = {
      nin: nin,
      payment: payment,
      payment_status: payment_status,
      school_year: school_year
    };
    query(
      "UPDATE quota set payment = ?, payment_status = ?, school_year = ? where nin = ?",
      [data.payment, data.payment_status, data.school_year, data.nin]
    )
      .then((result) => {
        console.log(data);
        console.log(result);
        if (result.affectedRows != 1)
          reject("Model: Problema na edição de quota");
        else resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    }
)};


exports.cRud_DeleteEspera = (nif) => {
  return new Promise((resolve, reject) => {
    query("DELETE FROM waitinglist WHERE nif=?", [nif] )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.Crud_EditarEspera = (nome, nif, tlf, birthdate) => {
  console.log("entrou no mysql")
  return new Promise((resolve, reject) => {
    data = {
	name: nome,
    nif: nif,
    tlf: tlf,
    birthdate: birthdate,
    };
    query(
      "UPDATE waitinglist set name = ?, tlf = ?, birthdate = ? where nif = ?",
      [data.name, data.tlf, data.birthdate, data.nif]
    )
      .then((result) => {
        console.log(data);
        console.log(result);
        if (result.affectedRows != 1)
          reject("Model: Problema na edição da lista de espera");
        else resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    }
)};


exports.cRud_DeleteDoc = (nin) => {
  return new Promise((resolve, reject) => {
    query("DELETE FROM statusdocument WHERE nin=?", [nin] )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.Crud_EditarDoc = (nin, send, signature, received) => {
  console.log("entrou no mysql")
  return new Promise((resolve, reject) => {
    data = {
      nin: nin,
      send: send,
      signature: signature,
      received : received
    };
    query(
      "UPDATE statusdocument set send = ?, signature = ?, received = ? where nin = ?",
      [data.send, data.signature, data.received, data.nin]
    )
      .then((result) => {
        console.log(data);
        console.log(result);
        if (result.affectedRows != 1)
          reject("Model: Problema na edição do estado de um documento");
        else resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    }
)};


exports.cRud_DeleteSecretario = (email) => {
  return new Promise((resolve, reject) => {
    query("DELETE FROM secretagrup WHERE email=?", [email] )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.Crud_EditarSecretario = (email, section) => {
  console.log("entrou no mysql")
  return new Promise((resolve, reject) => {
    data = {
      email: email,
      section: section,
    };
    query(
      "UPDATE secretagrup set section = ? where email = ?",
      [data.section,data.email]
    )
      .then((result) => {
        console.log(data);
        console.log(result);
        if (result.affectedRows != 1)
          reject("Model: Problema na edição do secretário");
        else resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    }
)};

exports.cRud_DeleteEscuteiro = (nin) => {
  return new Promise((resolve, reject) => {
    query("DELETE FROM associados WHERE nin=?", [nin] )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.Crud_EditarEscuteiro = (upload, nin, admissiondate, section, name, citizencard, personsex, nif, birthdateAss, nationality, naturalness, address, vilage, zipcode, city, district, mobilephone, phone, email, school, profession, fathername, fatherprofession, fathermobilephone, fatheremail, mothername, motherprofession, mothermobilephone, motheremail, sponsername, sponserprofession, sponsermobilephone, sponsoremail, healthnumber, allergies, description_allergies, regular_medication, dietary_restrictions, other_health_problems, data_processing, health_data, data_voice_image, social_networks__educating, email_educating, collective_transport, data_sharing, all_health_data, name1, parent1, mobile1, name2, parent2, mobile2) => {
  console.log("entrou no mysql")
  return new Promise((resolve, reject) => {
    data = {
      upload: upload,
      nin : nin,
      admissiondate : admissiondate,
      section : section,
      name : name,
      citizencard : citizencard,
      personsex : personsex,
      nif : nif,
      birthdateAss : birthdateAss,
      nationality : nationality,
      naturalness : naturalness,
      address : address,
      vilage : vilage,
      zipcode : zipcode,
      city : city,
      district : district,
      mobilephone : mobilephone,
      phone : phone,
      email : email,
      school : school,
      profession : profession,
      fathername : fathername,
      fatherprofession : fatherprofession,
      fathermobilephone : fathermobilephone,
      fatheremail : fatheremail,
      mothername : mothername,
      motherprofession : motherprofession,
      mothermobilephone : mothermobilephone,
      motheremail : motheremail,
      sponsername : sponsername,
      sponserprofession : sponserprofession,
      sponsermobilephone : sponsermobilephone,
      sponsoremail : sponsoremail,
      healthnumber : healthnumber,
      allergies : allergies,
      description_allergies : description_allergies,
      regular_medication : regular_medication,
      dietary_restrictions : dietary_restrictions,
      other_health_problems : other_health_problems,
      data_processing : data_processing,
      health_data : health_data,
      data_voice_image : data_voice_image,
      social_networks__educating : social_networks__educating,
      email_educating : email_educating,
      collective_transport : collective_transport,
      data_sharing : data_sharing,
      all_health_data : all_health_data,
      name1 : name1,
      parent1 : parent1,
      mobile1 : mobile1,
      name2 : name2,
      parent2 : parent2,
      mobile2 : mobile2,
    };
    query(
      "UPDATE associados set upload = ?, section = ?, name = ?, citizencard = ?, personsex = ?, nif = ?, birthdateAss = ?, nationality = ?, naturalness = ?, address = ?, vilage = ?, zipcode = ?, city = ?, district = ?, mobilephone = ?, phone = ?, email = ?, school = ?, profession = ?, fathername = ?, fatherprofession = ?, fathermobilephone = ?, fatheremail = ?, mothername = ?, motherprofession = ?, mothermobilephone = ?, motheremail = ?, sponsername = ?, sponserprofession = ?, sponsermobilephone = ?, sponsoremail = ?, healthnumber = ?, allergies = ?, description_allergies = ?, regular_medication = ?, dietary_restrictions = ?, other_health_problems = ?, data_processing = ?, health_data = ?, data_voice_image = ?, social_networks__educating = ?, email_educating = ?, collective_transport = ?, data_sharing = ?, all_health_data = ?, name1 = ?, parent1 = ?, mobile1 = ?, name2 = ?, parent2 = ?, mobile2 = ? where nin = ?",
      [data.upload, data.section, data.name, data.citizencard, data.personsex, data.nif, data.birthdateAss, data.nationality, data.naturalness, data.address, data.vilage, data.zipcode, data.city, data.district, data.mobilephone, data.phone, data.email, data.school, data.profession, data.fathername, data.fatherprofession, data.fathermobilephone, data.fatheremail, data.mothername, data.motherprofession, data.mothermobilephone, data.motheremail, data.sponsername, data.sponserprofession, data.sponsermobilephone, data.sponsoremail, data.healthnumber, data.allergies, data.description_allergies, data.regular_medication, data.dietary_restrictions, data.other_health_problems, data.data_processing, data.health_data, data.data_voice_image, data.social_networks__educating, data.email_educating, data.collective_transport, data.data_sharing, data.all_health_data, data.name1, data.parent1, data.mobile1, data.name2, data.parent2, data.mobile2, data.nin]
    )
      .then((result) => {
        console.log(data);
        console.log(result);
        if (result.affectedRows != 1)
          reject("Model: Problema na edição de um escuteiro");
        else resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    }
)};