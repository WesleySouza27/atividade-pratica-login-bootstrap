const formSignup = document.getElementById("form-signup");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rePasswordInput = document.getElementById("re-password");

// Alerts
const successAlertSignup = document.getElementById("success-alert-signup");
const errorAlertSignup = document.getElementById("error-alert-signup");

formSignup.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Verifica se a senha e a confirmação coincidem
    if (passwordInput.value !== rePasswordInput.value) {
        errorAlertSignup.innerText = "As senhas não coincidem.";
        successAlertSignup.classList.add("d-none");
        errorAlertSignup.classList.remove("d-none");
        return;
    }

    const userData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        const response = await api.post('/signup', userData);

        if (response.status === 201) {
            successAlertSignup.innerText = response.data.message;
            successAlertSignup.classList.remove("d-none");
            errorAlertSignup.classList.add("d-none");

            // Limpa os campos do formulário
            formSignup.reset();

            // Fecha o modal automaticamente após 3 segundos
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('modal-signup'));
                modal.hide();
            }, 3000);
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message ?? "Erro ao cadastrar usuário. Tente novamente.";
        errorAlertSignup.innerText = errorMessage;
        successAlertSignup.classList.add("d-none");
        errorAlertSignup.classList.remove("d-none");
    }
});
