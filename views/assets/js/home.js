// Definindo uma variável global para armazenar as listas carregadas,
// assim outras funções podem acessá-las sem recarregar tudo.
let listasCarregadas = [];

// --- Funções de API ---

/**
 * Carrega as listas do backend e atualiza a interface.
 * @returns {Promise<Array>} Uma Promise que resolve com o array de listas.
 */
async function carregarEExibirListas() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.warn('Token de autenticação não encontrado. Redirecionando ou exibindo erro.');
        // Opcional: Redirecionar para a página de login ou exibir uma mensagem de erro na UI
        return [];
    }

    try {
        const resposta = await fetch('/home/home', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!resposta.ok) { // Verifica se a resposta não foi um sucesso (status 2xx)
            const erroDados = await resposta.json();
            throw new Error(erroDados.erro || `Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        listasCarregadas = dados; // Atualiza o array global
        renderizarListas(listasCarregadas); // Chama a função para renderizar

        return dados;
    } catch (e) {
        console.error('Erro ao buscar listas:', e.message);
        exibirMensagem('Erro ao carregar as listas. Tente novamente mais tarde.', 'error');
        return []; // Retorna um array vazio em caso de erro
    }
}

/**
 * Envia uma requisição para criar uma nova lista no backend.
 * @param {string} nomeLista O nome da lista a ser criada.
 * @returns {Promise<Object>} Uma Promise que resolve com os dados da lista criada.
 */
async function criarListaNoBackend(nomeLista) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token de autenticação não encontrado.');
    }

    try {
        const resposta = await fetch('/lista', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nomeLista })
        });

        const dados = await resposta.json();

        if (!resposta.ok) { // Se a API retornar um erro (ex: status 400, 500)
            throw new Error(dados.erro || `Erro HTTP: ${resposta.status}`);
        }

        return dados; // A API deve retornar a lista criada com o ID
    } catch (e) {
        console.error('Erro ao criar lista:', e.message);
        throw e; // Re-lança o erro para ser tratado pela função que chamou
    }
}

// --- Funções de UI ---

/**
 * Renderiza o array de listas na interface.
 * @param {Array} listas Array de objetos de lista.
 */
function renderizarListas(listas) {
    const elementoListas = document.getElementById('listas');
    if (!elementoListas) {
        console.error("Elemento com ID 'listas' não encontrado.");
        return;
    }

    if (listas.length === 0) {
        elementoListas.innerHTML = '<p>Nenhuma lista encontrada.</p>';
        return;
    }

    // Renderiza cada item de lista com um ID para futuras operações (deletar/editar)
    elementoListas.innerHTML = listas.map(item => `
        <div data-id="${item._id || item.idLista}" class="lista-item">
            <span>${item.nomeLista}</span>
            <button class="btn-deletar">X</button>
        </div>
    `).join('');

    // Adiciona event listeners aos botões de deletar
    document.querySelectorAll('.btn-deletar').forEach(button => {
        button.addEventListener('click', (event) => {
            const listaId = event.target.closest('.lista-item').dataset.id;
            if (confirm(`Tem certeza que deseja apagar esta lista?`)) {
                deletarLista(listaId);
            }
        });
    });
}

/**
 * Exibe uma mensagem para o usuário.
 * @param {string} texto A mensagem a ser exibida.
 * @param {string} tipo O tipo da mensagem ('success' ou 'error').
 */
function exibirMensagem(texto, tipo = 'info') {
    const mensagemElemento = document.getElementById('mensagem');
    if (!mensagemElemento) {
        console.warn("Elemento de mensagem não encontrado.");
        return;
    }
    mensagemElemento.textContent = texto;
    mensagemElemento.className = `mensagem ${tipo}`; // Para estilização (CSS)
    setTimeout(() => {
        mensagemElemento.textContent = '';
        mensagemElemento.className = 'mensagem';
    }, 3000); // Limpa a mensagem após 3 segundos
}

/**
 * Função para deletar uma lista (necessita de um endpoint DELETE no backend).
 * @param {string} idDaLista O ID da lista a ser deletada.
 */
async function deletarLista(idDaLista) {
    const token = localStorage.getItem('token');
    if (!token) {
        exibirMensagem('Você não está autenticado.', 'error');
        return;
    }

    try {
        const resposta = await fetch(`/lista/${idDaLista}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || `Erro HTTP: ${resposta.status}`);
        }

        exibirMensagem('Lista deletada com sucesso!', 'success');
        carregarEExibirListas(); // Recarrega e renderiza a UI após deletar
    } catch (e) {
        console.error('Erro ao deletar lista:', e.message);
        exibirMensagem('Erro ao deletar lista: ' + e.message, 'error');
    }
}


// --- Event Listeners (Inicialização) ---

// Carrega as listas assim que o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', carregarEExibirListas);

// Event listener para o botão de adicionar lista
document.getElementById('btn-adicionarLista').addEventListener('click', async () => {
    const inputLista = document.getElementById('input-Lista');
    const nomeLista = inputLista.value.trim(); // .trim() remove espaços em branco extras

    if (!nomeLista) {
        exibirMensagem('O nome da lista não pode ser vazio.', 'error');
        return;
    }

    try {
        exibirMensagem('Criando lista...', 'info');
        const dadosCriados = await criarListaNoBackend(nomeLista); // Chama a função que interage com a API
        exibirMensagem('Lista criada com sucesso!', 'success');

        inputLista.value = ''; // Limpa o input
        // Ao invés de recarregar TUDO, podemos adicionar a nova lista ao array existente
        // E então re-renderizar. Isso é mais performático.
        // Assumindo que dadosCriados.listaCriada contém o objeto completo da nova lista
        if (dadosCriados.listaCriada) {
            listasCarregadas.push(dadosCriados.listaCriada);
            renderizarListas(listasCarregadas);
        } else {
            // Se a API não retornar o objeto completo, recarregar é a forma mais simples
            carregarEExibirListas();
        }

    } catch (e) {
        exibirMensagem('Erro ao criar lista: ' + e.message, 'error');
    }
});