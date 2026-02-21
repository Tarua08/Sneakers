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

const aiForm = document.getElementById("aiForm");
const aiOutput = document.getElementById("aiOutput");

aiForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  aiOutput.textContent = "Thinking...";

  const payload = {
    budget: document.getElementById("budget").value,
    useCase: document.getElementById("useCase").value,
    style: document.getElementById("style").value,
    brandPreference: document.getElementById("brandPreference").value,
    country: "India"
  };

  try {
    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request failed");

    aiOutput.textContent = data.data
      ? JSON.stringify(data.data, null, 2)
      : data.raw || "No response";
  } catch (err) {
    aiOutput.textContent = `Error: ${err.message}`;
  }
});
