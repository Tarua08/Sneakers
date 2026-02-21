const shoes = [
  { name: "Nike Air Max Excee", type: "Daily", budget: "₹7k-₹9k" },
  { name: "Adidas Runfalcon", type: "Daily/Gym", budget: "₹4k-₹6k" },
  { name: "Puma Caven 2.0", type: "Lifestyle", budget: "₹5k-₹7k" },
  { name: "New Balance 574", type: "Lifestyle", budget: "₹8k-₹11k" }
];

const grid = document.getElementById("shoeGrid");
for (const s of shoes) {
  const el = document.createElement("div");
  el.className = "item";
  el.innerHTML = `<span class="tag">${s.type}</span><h3>${s.name}</h3><p>Budget: ${s.budget}</p>`;
  grid.appendChild(el);
}
