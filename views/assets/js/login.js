document.getElementById('formCadastro').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = this.email.value;
    const senha = this.senha.value;

    try {
      const resposta = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      console.log('passou do fetch')

      const dados = await resposta.json();

      const div = document.getElementById('mensagem');
      div.style.color = resposta.ok ? 'green' : 'red';
      div.innerText = dados.mensagem || dados.erro;

      if (resposta.ok) {
        const token = dados.token;
        localStorage.setItem('token', token);
        window.location.href = '/home';
      }

    } catch (erro) {
      document.getElementById('mensagem').innerText = 'Erro na requisição';
    }
  });