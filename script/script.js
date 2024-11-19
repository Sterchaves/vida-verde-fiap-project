document.getElementById("filterForm").addEventListener("change", function() {
    const apartamentoFilter = document.getElementById("apartamento").value.toLowerCase();
    const blocoFilter = document.getElementById("bloco").value.toLowerCase();
    const categoriaFilter = document.getElementById("categoria").value.toLowerCase();

    const tableRows = document.querySelectorAll("#tableBody tr");

    tableRows.forEach(row => {
        const apartamento = row.cells[0].textContent.toLowerCase();
        const bloco = row.cells[1].textContent.toLowerCase();
        const categoria = row.cells[2].textContent.toLowerCase();

        const apartamentoMatch = apartamento.includes(apartamentoFilter) || apartamentoFilter === "";
        const blocoMatch = bloco.includes(blocoFilter) || blocoFilter === "";
        const categoriaMatch = categoria.includes(categoriaFilter) || categoriaFilter === "";

        // Se todos os filtros corresponderem, mostramos a linha, caso contrário, ocultamos
        if (apartamentoMatch && blocoMatch && categoriaMatch) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

// Função para calcular os totais de cada categoria
function updateOverview() {
    const tableRows = document.querySelectorAll("#tableBody tr");
    const totals = {
        Metal: 0,
        Vidro: 0,
        Papel: 0,
        Plástico: 0
    };

    tableRows.forEach(row => {
        const categoria = row.cells[2].textContent;
        const quantidade = parseFloat(row.cells[3].textContent);

        if (!isNaN(quantidade)) {
            totals[categoria] += quantidade;
        }
    });

    // Atualizando a tabela de visão geral com os totais
    const overviewTableBody = document.getElementById("overviewTableBody");
    overviewTableBody.innerHTML = `
        <tr><td>Metal</td><td>${totals.Metal.toFixed(2)}</td></tr>
        <tr><td>Vidro</td><td>${totals.Vidro.toFixed(2)}</td></tr>
        <tr><td>Papel</td><td>${totals.Papel.toFixed(2)}</td></tr>
        <tr><td>Plástico</td><td>${totals.Plástico.toFixed(2)}</td></tr>
    `;
}

// Chamando a função de atualização ao carregar a página para garantir que a tabela de visão geral seja inicializada corretamente
window.onload = updateOverview;
