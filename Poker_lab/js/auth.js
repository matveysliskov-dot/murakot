const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.textContent = "Регистрация...";

    try {

        // Создаём пользователя в Supabase Auth
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            throw error;
        }

        if (!data.user) {
            throw new Error("Пользователь не был создан");
        }

        // Создаём профиль пользователя
        const { error: profileError } = await supabaseClient
            .from("profiles")
            .insert({
                id: data.user.id,
                username: username
            });

        if (profileError) {
            throw profileError;
        }

        message.textContent = "Регистрация успешна!";

        // Переходим на главную
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } catch (error) {

        console.error(error);

        message.textContent =
            "Ошибка: " + error.message;
    }
});