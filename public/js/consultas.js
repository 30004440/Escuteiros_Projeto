async function listaLobitos() {
  const response = await fetch("/controller/listarLobitos");
  const data = await response.json();
  const listaLobitos = document.getElementById("listarLobitos");

  for (lobito of data) {
    const root = document.createElement("div");
    //const do campoAApareserNaPagina = document.createElement("div");
    const nome = document.createElement("div");
    const email = document.createElement(`div`);

    //ApareserNaPagina.textContent = `Nome do Campo: ${lobito.campodaBD}`;
    nome.textContent = `Nome do Administrador: ${administrador.name}`;
    email.textContent = `E-mail: ${administrador.email}`;
    root.append(nome, email);
    listaLobitos.append(root);
  }
  console.log(listaLobitos);
}