async function obtainToken(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://joao195guchert.pythonanywhere.com/api/v1/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.access); // Armazenando o token de acesso
            window.location.href = 'create_car.html'; // Redirecionando para a criação de carros
        } else {
            const errorData = await response.json();
            document.getElementById('message').textContent = `Login failed: ${errorData.detail}`;
        }
    } catch (error) {
        document.getElementById('message').textContent = `Error: ${error.message}`;
    }
}

document.getElementById('loginForm').addEventListener('submit', obtainToken);