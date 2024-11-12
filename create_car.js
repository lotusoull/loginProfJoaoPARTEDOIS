async function createCar(event) {
    event.preventDefault();

    const model = document.getElementById('model').value;
    const brandName = document.getElementById('brand').value; // Supondo que você esteja pegando o nome da marca
    const factoryYear = document.getElementById('factory_year').value;
    const modelYear = document.getElementById('model_year').value;
    const color = document.getElementById('color').value;
    const description = document.getElementById('description').value;
    const messageElement = document.getElementById('message');

    const token = localStorage.getItem('token');

    try {
        // Obtenha o ID da marca com base no nome (ou você pode preencher uma lista de IDs em um dropdown)
        const brandResponse = await fetch(`https://joao195guchert.pythonanywhere.com/api/v1/brands/?name=${brandName}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!brandResponse.ok) {
            throw new Error("Failed to fetch brand");
        }

        const brandData = await brandResponse.json();
        const brandId = brandData[0]?.id; // Obtenha o ID da primeira marca retornada

        if (!brandId) {
            messageElement.textContent = "Brand not found!";
            return;
        }

        // Criação do carro
        const response = await fetch('https://joao195guchert.pythonanywhere.com/api/v1/cars/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Send the JWT token
            },
            body: JSON.stringify({
                model,
                brand: brandId, // Enviando o ID da marca
                factory_year: factoryYear,
                model_year: modelYear,
                color,
                description,
            })
        });

        if (response.ok) {
            messageElement.textContent = "Car created successfully!";
            // Opcional: Redirecionar ou limpar o formulário aqui
        } else {
            const errorData = await response.json();
            messageElement.textContent = `Failed to create car: ${errorData.detail}`;
        }
    } catch (error) {
        messageElement.textContent = `Error: ${error.message}`;
    }
}

document.getElementById('createCarForm').addEventListener('submit', createCar);