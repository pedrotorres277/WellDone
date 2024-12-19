const apiUrl = "http://localhost:3000"; // URL do backend

document.getElementById('empresa-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Captura os valores do formulário
    const empresa = {
        name: document.getElementById('name').value,
        cnpj: document.getElementById('cnpj').value,
        site: document.getElementById('site').value,
        endereco: document.getElementById('endereco').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        instagram: document.getElementById('instagram').value,
        produto: document.getElementById('produto').value,
        valorProduto: parseFloat(document.getElementById('valorProduto').value),
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Indica que o corpo é JSON
            },
            body: JSON.stringify(empresa), // Envia os dados como JSON
        });

        if (response.ok) {
            alert("Empresa adicionada com sucesso!");
            fetchEmpresas(); // Atualiza a lista de empresas
        } else {
            alert("Erro ao adicionar empresa.");
        }
    } catch (error) {
        console.error("Error adding empresa:", error);
        alert("Erro ao adicionar empresa.");
    }
});


// Função para carregar e exibir empresas
async function fetchEmpresas() {
    try {
        const response = await fetch(apiUrl); // Faz uma requisição GET para o backend
        const empresas = await response.json(); // Converte a resposta em JSON

        const list = document.getElementById('empresas-list');
        list.innerHTML = ""; // Limpa a lista antes de exibir os novos dados

        // Adiciona cada empresa como um item na lista
        empresas.forEach(empresa => {
            const li = document.createElement('li'); // Cria um item de lista
            li.classList.add('empresas')
            li.innerHTML = `
                <strong>${empresa.name}</strong><br>
                CNPJ: ${empresa.cnpj}<br>
                Site: <a href="${empresa.site}" target="_blank">${empresa.site}</a><br>
                Endereço: ${empresa.endereco}<br>
                Telefone: ${empresa.telefone}<br>
                Email: <a href="mailto:${empresa.email}">${empresa.email}</a><br>
                Instagram: <a href="https://instagram.com/${empresa.instagram}" target="_blank">@${empresa.instagram}</a><br>
                Produto: ${empresa.produto}<br>
                Valor: R$ ${empresa.valorProduto.toFixed(2)}<br>
                <hr>
            `; // Formata os dados da empresa
            list.appendChild(li); // Adiciona o item à lista
        });
    } catch (error) {
        console.error("Error fetching empresas:", error);
    }
}

// Chama a função ao carregar a página
fetchEmpresas();
