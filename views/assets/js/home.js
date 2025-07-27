(async function carregaLista() {
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

    const main = document.querySelector('main');
    // main.innerHTML = dados[2].nomeLista;
    main.innerHTML = dados.map(item => `<div>${item.nomeLista}</div>`).join('');



  } catch (e) {
    console.error('Erro ao buscar /home:', e);
  }
})();


// Parte para criar lista

document.getElementById('btn-adicionarLista').addEventListener('submit', async () => {
  const nomeLista = document.getElementById('input-Lista').value;
  const token = localStorage.getItem('token');

  try {
    const resposta = await fetch('/lista',{
      method: 'POST',
      headers: {
        'Conttent-Type': 'json/application',
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