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

const urlBase = "https://localhost:8080/homepage";
const modalLogin = document.getElementById("modalLogin");
const bsModalLogin = new bootstrap.Modal(modalLogin, (backdrop = "static")); // Pode passar opções
const btnModalLogin = document.getElementById("btnModalLogin");


modalLogin.addEventListener("shown.bs.modal", () => {
  document.getElementById("usernameLogin").focus();
});
btnModalLogin.addEventListener("click", () => {
  bsModalLogin.show();
});

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
          document.getElementById("btnSubmitLogin").disabled = false;
          document.getElementById("btnLoginClose").click();
          window.location.replace(body.path)
        } else {
          throw body;
        }
      });
    })
    .catch((body) => {
      result = body.erro;
      document.getElementById("statusLogin").innerHTML = `${result}`;
      console.log("Catch:");
      console.log(result);
    });
}