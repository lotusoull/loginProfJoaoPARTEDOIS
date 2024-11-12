async function createBrand(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const messageElement = document.getElementById('message');

    const token = localStorage.getItem('token');

    try {
        const response = await fetch('https://joao195guchert.pythonanywhere.com/api/v1/brands/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Send the JWT token
            },
            body: JSON.stringify({
                name,
                description,
            })
        });

        if (response.ok) {
            messageElement.textContent = "Brand created successfully!";
        } else {
            const errorData = await response.json();
            messageElement.textContent = `Failed to create brand: ${errorData.detail}`;
        }
    } catch (error) {
        messageElement.textContent = `Error: ${error.message}`;
    }
}

document.getElementById('createBrandForm').addEventListener('submit', createBrand);