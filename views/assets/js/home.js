const listas = (async function carregaLista() {
  const token = localStorage.getItem('token');

  try {
    const resposta = await fetch('/home/home', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const dados = await resposta.json();
    // console.log(dados);

    const listas = document.getElementById('listas');
    
    listas.innerHTML = dados.map(item => `<div>${item.nomeLista}</div>`).join('');


    return dados;
  } catch (e) {
    console.error('Erro ao buscar /home:', e);
  }
})();


// Parte para criar lista

document.getElementById('btn-adicionarLista').addEventListener('click', async () => {
  const nomeLista = document.getElementById('input-Lista').value;
  const token = localStorage.getItem('token');

  try {
    console.log('Criando lista:', nomeLista);
    const resposta = await fetch('/lista',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({nomeLista}) 
    })

    const dados = await resposta.json();
    const mensagem = document.getElementById('mensagem');

    if(dados.ok){
    mensagem.textContent = 'Lista criada com sucesso!';
    carregaLista();
    }else{
      mensagem.textContent = 'Erro ao criar lista: ' + dados.erro;
    }


  }catch(e){
    console.log(e)
  }

})