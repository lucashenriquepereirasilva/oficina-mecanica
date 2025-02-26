document.addEventListener("DOMContentLoaded", function() {
    const dataElement = document.getElementById("dataAtual");
    const data = new Date();
    const dataFormatada = data.toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    dataElement.textContent = `Hoje é ${dataFormatada}`;
});
