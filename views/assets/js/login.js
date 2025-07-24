document.getElementById('formCadastro').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = this.email.value;
    const senha = this.senha.value;

    try {
      const resposta = await fetch('/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      const div = document.getElementById('mensagem');
      div.style.color = resposta.ok ? 'green' : 'red';
      div.innerText = dados.mensagem || dados.erro;

      if (resposta.ok) {
        // redirecionar após sucesso (opcional)
        // setTimeout(() => window.location.href = '/login', 1000);
      }
    } catch (erro) {
      document.getElementById('mensagem').innerText = 'Erro na requisição';
    }
  });