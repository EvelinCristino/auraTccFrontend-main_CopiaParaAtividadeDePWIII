// cadastro.js
const form = document.getElementById('form-cadastro');
const btnCadastrar = document.getElementById('btn-cadastrar');

btnCadastrar.addEventListener('click', async (e) => {
  e.preventDefault(); // evita comportamento padrão do <a>

  // Captura os valores do formulário
  const nomeCompleto = document.getElementById('name').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('password').value;
  const senhaConfirm = document.getElementById('password-confirm').value;

  // Validação básica
  if (!nomeCompleto || !cpf || !email || !senha || !senhaConfirm) {
    alert('Preencha todos os campos!');
    return;
  }

  if (senha !== senhaConfirm) {
    alert('As senhas não coincidem!');
    return;
  }

  // Objeto para enviar à API
  const paciente = { nomeCompleto, cpf, email, senha };

  try {
    const response = await fetch('https://auratccbackend.onrender.com/api/pacientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paciente)
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.erro || 'Erro ao cadastrar paciente');
      return;
    }

    alert('Cadastro realizado com sucesso!');
    form.reset(); // limpa os campos
  } catch (error) {
    console.error('Erro de conexão:', error);
    alert('Erro de conexão com o servidor.');
  }
});
