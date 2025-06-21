// ======================== FUNÇÕES AUXILIARES ========================
function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ==================== FUNÇÕES DE MANIPULAÇÃO DE UI ====================
function toggleMensagem(button) {
  const ingredientes = button.nextElementSibling;

  if (ingredientes.style.display === "none" || !ingredientes.style.display) {
    ingredientes.style.display = "block";
    button.textContent = "Ocultar ingredientes";
  } else {
    ingredientes.style.display = "none";
    button.textContent = "Ingredientes";
  }
}
// ==========================parte do pesquisar=============================
//====EU MUDEI COMO FUNCIONA, AGORA E POR NOME POR ISSO COLOQUEI CLASS PESQUISAVEL, E MELHOR
function handleSearch() {
  const rawTermo = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
  const termo = removerAcentos(rawTermo);

  const mapaItens = {
    local: "#local",
    horarios: "#horarios",
    contato: "#contato",
    macarrao: "#macarrao",
    pizza: "#pizza",
  };

  if (termo in mapaItens) {
    // Navega para a seção via hash e scroll suave
    const seletor = mapaItens[termo];
    window.location.hash = seletor;

    const el = document.querySelector(seletor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    const elementos = document.querySelectorAll(".pesquisavel");
    let encontrou = false;

    // Remove destaque antigo dos containers principais
    elementos.forEach((el) => {
      const container = el.closest('.card-prato') || el;
      container.style.backgroundColor = "";
      container.style.borderRadius = "";
    });

    // Procura o texto e destaca o container principal do primeiro que encontrar
    for (const el of elementos) {
      const texto = removerAcentos(el.textContent.toLowerCase());

      if (texto.includes(termo) && termo.length > 0) {
        const container = el.closest('.card-prato') || el;
        container.style.backgroundColor = "#a8d5a2";//isso aqui e na hora q a pessoa pesquisa e acha nome, tem q dar enter ou apertar lupa
        container.style.borderRadius = "8px";
        container.scrollIntoView({ behavior: "smooth", block: "center" });
        encontrou = true;
        break; // Para no primeiro resultado
      }
    }

    if (!encontrou && termo.length > 0) {
      alert("Nenhum resultado encontrado para: " + rawTermo);
    }
  }
}

// ======================== EVENT LISTENERS ========================
document.addEventListener("DOMContentLoaded", function () {
  // Configuração da pesquisa
  const searchIcon = document.getElementById("searchIcon");
  const searchInput = document.getElementById("searchInput");

  // Eventos de clique e teclado
  searchIcon.addEventListener("click", () => {
    const estavaEscondido = searchInput.classList.contains("hidden");
    searchInput.classList.toggle("hidden");

    if (estavaEscondido) {
      searchInput.focus();
    } else {
      handleSearch();
    }
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  });

  searchInput.addEventListener("input", () => {
    handleSearchRealTime();
  });
});

// Controle de rolagem ao carregar a página
window.addEventListener("load", function () {
  window.scrollTo(0, 0);
  history.replaceState(null, null, " ");
});
 

// Parte do cabecalho

 // Seleciona todos os links do menu
const links = document.querySelectorAll('.nav-link');

// Adiciona o evento de clique a cada link
links.forEach(link => {
  link.addEventListener('click', function () {
    // Remove a classe 'clicado' de todos os links
    links.forEach(el => el.classList.remove('clicado'));

    // Adiciona a classe 'clicado' ao item clicado
    this.classList.add('clicado');
  });
});

