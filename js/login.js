const formLogin = document.getElementById("form-login");
const emailLogin = document.getElementById("email-login");
const passwordLogin = document.getElementById("password-login");

// Alerts
const successAlert = document.getElementById("success-alert-login");
const errorAlert = document.getElementById("error-alert-login");

(() => {
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const data = {
            email: emailLogin.value,
            password: passwordLogin.value
        };
        
        try {
            const response = await api.post('/login', data);

            if (response.status === 200) {
                const userData = response.data;
                
                // Armazena o email do usuário no localStorage
                localStorage.setItem('userSection', userData.data); // Aqui salva o email do usuário
                
                // Exibe o alerta de sucesso
                successAlert.innerText = userData.message; // Mostra a mensagem de boas-vindas da resposta
                successAlert.classList.remove('d-none');
                errorAlert.classList.add('d-none');

                // Redireciona após 3 segundos
                setTimeout(() => {
                    window.location.assign('notes.html');
                }, 3000);
            }

        } catch (error) {
            // Exibe a mensagem de erro
            const errorMessage = error?.response?.data?.message ?? 'Erro ao fazer login. Por favor, tente novamente.';
            errorAlert.innerText = errorMessage;
            successAlert.classList.add('d-none');
            errorAlert.classList.remove('d-none');
        }
    });
})();
