    src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js";

    const apiKey = "20a14528cc1f4bcba93bea33d36090e4";
    const apiURLIngred = "https://api.spoonacular.com/food/ingredients/search";
    const apiUrlRecipe = "https://api.spoonacular.com/recipes/findByIngredients";

    let ingredients = [];

    // Function to validate ingredient with Spoonacular API
    async function isValidIngredient(ingredient) {
        try {
            const response = await fetch(`${apiURLIngred}?apiKey=${apiKey}&query=${ingredient}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.ingredients.length > 0;
        } catch (error) {
            console.error('Error fetching ingredient data:', error);
            return false;
        }
    }

    document.getElementById('ingredient-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const ingredientInput = document.getElementById('ingredient');
        const ingredient = ingredientInput.value.trim();
        
        if (ingredient) {
            const isValid = await isValidIngredient(ingredient);

            if (isValid) {
                // Add the ingredient to the list
                const ingredientList = document.getElementById('ingredient-list');
                const listItem = document.createElement('div');
                listItem.textContent = ingredient;
                listItem.className = 'ingredient';
                ingredientList.appendChild(listItem);
                // Clear the input field
                ingredientInput.value = '';
            } else {
                alert('Invalid ingredient. Please enter a valid ingredient.');
                ingredientInput.value = '';
            }
        }
    });
