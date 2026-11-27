const INGREDIENTS = [
  { id: "honey", name: "Raw Honey", color: "#f59e0b" },
  { id: "acacia", name: "Acacia Black Honey", color: "#451a03" },
  { id: "lemon", name: "Lemon Segar", color: "#eab308" },
  { id: "cinnamon", name: "Kayu Manis", color: "#92400e" },
  { id: "ginger", name: "Jahe Hangat", color: "#d97706" },
  { id: "mint", name: "Daun Mint", color: "#10b981" }
];

const RECIPES = [
  {
    keys: ["honey", "lemon"],
    tag: "MORNING FRESH",
    title: "Golden Lemon Boost",
    desc: "Segar dan ringan buat nemenin pagi hari sebelum mulai rutinitas.",
    ctaText: "Cek Raw Honey Lemonshot",
    url: "https://javahoney.id/?utm_source=jvhny.fun&utm_medium=mixer&utm_campaign=lemon_boost"
  },
  {
    keys: ["honey", "cinnamon"],
    tag: "AFTERNOON FOCUS",
    title: "Warm Spiced Ember",
    desc: "Kombinasi hangat dengan aroma rempah yang pas saat energi mulai turun.",
    ctaText: "Cek Raw Honey Cinnamonshot",
    url: "https://javahoney.id/?utm_source=jvhny.fun&utm_medium=mixer&utm_campaign=spiced_ember"
  },
  {
    keys: ["acacia", "ginger"],
    tag: "DEEP RECOVERY",
    title: "Dark Forest Shield",
    desc: "Karakter madu gelap yang pekat dipadu jahe buat bantu jaga stamina.",
    ctaText: "Cek Acacia Black Honey",
    url: "https://javahoney.id/?utm_source=jvhny.fun&utm_medium=mixer&utm_campaign=dark_shield"
  },
  {
    keys: ["honey", "lemon", "mint"],
    tag: "COOL REFRESH",
    title: "Citrus Mint Cooler",
    desc: "Sensasi segar lemon dan mint dengan manis alami yang seimbang.",
    ctaText: "Cek Raw Honey di Javahoney.id",
    url: "https://javahoney.id/?utm_source=jvhny.fun&utm_medium=mixer&utm_campaign=citrus_mint"
  }
];

let selected = [];

const ingredientsEl = document.getElementById("ingredients-list");
const liquidEl = document.getElementById("liquid-fill");
const selectedEl = document.getElementById("selected-ingredients");
const resultEl = document.getElementById("result-card");
const resetBtn = document.getElementById("reset-btn");

function renderIngredients() {
  ingredientsEl.innerHTML = "";
  INGREDIENTS.forEach((item) => {
    const isSelected = selected.some((s) => s.id === item.id);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ingredient-btn";
    btn.disabled = isSelected || selected.length >= 4;
    btn.innerHTML = `<span>+ ${item.name}</span><span>${isSelected ? "Di gelas" : "Tambah"}</span>`;
    btn.onclick = () => addIngredient(item);
    ingredientsEl.appendChild(btn);
  });
}

function addIngredient(item) {
  if (selected.length >= 4) return;
  if (selected.some((s) => s.id === item.id)) return;
  selected.push(item);
  updateUI();
}

function findMatchingRecipe(ids) {
  const sortedUser = [...ids].sort().join(",");
  return RECIPES.find((r) => [...r.keys].sort().join(",") === sortedUser);
}

function updateUI() {
  renderIngredients();

  if (selected.length === 0) {
    selectedEl.textContent = "Belum ada bahan di gelas.";
    liquidEl.style.height = "0%";
    resultEl.innerHTML = `
      <h3>3. Hasil Racikan</h3>
      <h2>Mulai racik minuman lo</h2>
      <p>Pilih minimal <strong>2 bahan</strong> (misal <em>Raw Honey + Lemon Segar</em>) buat lihat hasil racikannya.</p>
    `;
    return;
  }

  selectedEl.textContent = "Isi gelas: " + selected.map((s) => s.name).join(" + ");

  const heightPct = Math.min(selected.length * 24, 92);
  liquidEl.style.height = `${heightPct}%`;
  liquidEl.style.backgroundColor = selected[selected.length - 1].color;

  const ids = selected.map((s) => s.id);
  const match = findMatchingRecipe(ids);

  if (match) {
    const waText = encodeURIComponent(
      `Halo Javahoney, barusan gua nyoba racikan "${match.title}" (${selected.map((s) => s.name).join(", ")}) di jvhny.fun. Boleh info detail produk & promonya?`
    );
    const waLink = `https://wa.me/6282252345650?text=${waText}`;

    resultEl.innerHTML = `
      <h3>3. Hasil Racikan</h3>
      <span class="recipe-tag">${match.tag}</span>
      <h2>${match.title}</h2>
      <p>${match.desc}</p>
      <a class="btn-primary" href="${match.url}" target="_blank" rel="noopener">${match.ctaText}</a>
      <br />
      <a class="btn-primary" style="background:#15803d; margin-top:10px;" href="${waLink}" target="_blank" rel="noopener">Tanya Racikan Ini via WA</a>
    `;
  } else if (selected.length >= 2) {
    resultEl.innerHTML = `
      <h3>3. Hasil Racikan</h3>
      <span class="recipe-tag">CUSTOM MIX</span>
      <h2>Eksperimen ${selected.length} Bahan</h2>
      <p>Kombinasi ini belum masuk resep signature—coba <strong>Raw Honey + Lemon Segar</strong>, <strong>Raw Honey + Kayu Manis</strong>, atau <strong>Acacia Black Honey + Jahe Hangat</strong>.</p>
      <a class="btn-primary" href="https://javahoney.id/?utm_source=jvhny.fun&utm_medium=mixer&utm_campaign=custom_mix" target="_blank" rel="noopener">Belanja Madu di Javahoney.id</a>
    `;
  } else {
    resultEl.innerHTML = `
      <h3>3. Hasil Racikan</h3>
      <h2>Tambah 1 bahan lagi</h2>
      <p>Baru ada <strong>${selected[0].name}</strong> di gelas. Tambahkan bahan lain untuk melihat efek racikannya.</p>
    `;
  }
}

resetBtn.onclick = () => {
  selected = [];
  updateUI();
};

updateUI();
