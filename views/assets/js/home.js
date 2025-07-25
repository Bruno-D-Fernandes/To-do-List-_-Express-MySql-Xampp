(async () => {
  const token = localStorage.getItem('token');

  try {
    const resposta = await fetch('/home', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const dados = await resposta.json();
    console.log(dados);

  } catch (e) {
    console.error('Erro ao buscar /home:', e);
  }
})();
