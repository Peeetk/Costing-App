function addIngredient() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input class="input" placeholder="Ingredient">
    <input class="input" type="number" placeholder="Quantity">
    <input class="input" placeholder="Unit">
    <input class="input" type="number" placeholder="Price">
  `;
  document.getElementById("ingredientsList").appendChild(div);
}

function calculateCost() {
  const quantities = document.querySelectorAll("#ingredientsList input:nth-child(2)");
  const prices = document.querySelectorAll("#ingredientsList input:nth-child(4)");
  const servings = parseFloat(document.getElementById("servings").value) || 1;

  let total = 0;
  for (let i = 0; i < quantities.length; i++) {
    const qty = parseFloat(quantities[i].value) || 0;
    const price = parseFloat(prices[i].value) || 0;
    total += price * qty;
  }

  const perPerson = total / servings;
  document.getElementById("costOutput").innerHTML = `
    <p>Total Cost: $${total.toFixed(2)}</p>
    <p>Cost Per Serving: $${perPerson.toFixed(2)}</p>
  `;
}

function saveRecipe() {
  const name = document.getElementById("recipeName").value;
  const servings = document.getElementById("servings").value;
  const ingredients = Array.from(document.querySelectorAll("#ingredientsList > div")).map(div => {
    const inputs = div.querySelectorAll("input");
    return {
      name: inputs[0].value,
      quantity: inputs[1].value,
      unit: inputs[2].value,
      price: inputs[3].value
    };
  });

  const recipe = { name, servings, ingredients };
  localStorage.setItem(name, JSON.stringify(recipe));
  alert("Recipe saved to local storage!");
}

function exportToPDF() {
  const element = document.getElementById("contentToExport");

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
