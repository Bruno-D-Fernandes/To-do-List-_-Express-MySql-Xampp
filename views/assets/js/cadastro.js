document.getElementById('formCadastro').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = this.nome.value;
    const email = this.email.value;
    const senha = this.senha.value;

    try {
      const resposta = await fetch('/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });

      const dados = await resposta.json();

      const div = document.getElementById('mensagem');
      div.style.color = resposta.ok ? 'green' : 'red';
      div.innerText = dados.mensagem || dados.erro;

      if (resposta.ok) {
        setTimeout(() => window.location.href = '/', 3000);
      }
    } catch (erro) {
      document.getElementById('mensagem').innerText = 'Erro na requisição';
    }
  });