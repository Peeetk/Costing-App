function addIngredient() {
  const container = document.getElementById('ingredientsList');
  const div = document.createElement('div');
  div.innerHTML = `
    <input class="input" placeholder="Ingredient">
    <input class="input" type="number" placeholder="Quantity">
    <input class="input" placeholder="Unit">
    <input class="input" type="number" placeholder="Price">
  `;
  container.appendChild(div);
}

function calculateCost() {
  const inputs = document.querySelectorAll('#ingredientsList > div');
  let total = 0;
  inputs.forEach(div => {
    const price = parseFloat(div.children[3].value) || 0;
    total += price;
  });
  const servings = parseFloat(document.getElementById('servings').value) || 1;
  document.getElementById('costOutput').innerText =
    `Total Cost: $${total.toFixed(2)} | Per Person: $${(total / servings).toFixed(2)}`;
}

function saveRecipe() {
  const name = document.getElementById('recipeName').value;
  const servings = document.getElementById('servings').value;
  const ingredients = [];
  document.querySelectorAll('#ingredientsList > div').forEach(div => {
    ingredients.push({
      ingredient: div.children[0].value,
      quantity: div.children[1].value,
      unit: div.children[2].value,
      price: div.children[3].value
    });
  });
  const recipe = { name, servings, ingredients };
  localStorage.setItem(name, JSON.stringify(recipe));
  alert('Recipe Saved');
}

function exportToPDF() {
  const element = document.getElementById('pdfContent');
  const opt = {
    margin: 10,
    filename: 'dish-costing.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };
  html2pdf().set(opt).from(element).save();
}
