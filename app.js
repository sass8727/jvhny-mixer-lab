const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw0KrJuzpV-9_0cUk7EEiPD7u50taudkd1qg4RMYl76peK6X1nmQ4nUe4RuHedKKDpf/exec";

const INGREDIENTS = [
  { id: "honey", name: "Raw Honey", color: "#f59e0b" },
  { id: "acacia", name: "Acacia Black Honey", color: "#92400e" },
  { id: "lemon", name: "Lemon Segar", color: "#eab308" },
  { id: "cinnamon", name: "Kayu Manis", color: "#b45309" },
  { id: "ginger", name: "Jahe Hangat", color: "#d97706" },
  { id: "mint", name: "Daun Mint", color: "#10b981" }
];

const RECIPES = [
  {
    keys: ["honey", "lemon"],
    tag: "MORNING FRESH",
    title: "Golden Lemon Boost",
    ratio: "1 sdm Raw Honey + 2 sdm perasan lemon + 150 ml air hangat/dingin.",
    desc: "Segar dan ringan buat nemenin pagi hari sebelum mulai rutinitas.",
    ctaText: "Cek Raw Honey Lemonshot",
    url: "https://javahoney.id/?utm_source=jvhny.fun&utm_medium=mixer&utm_campaign=lemon_boost"
  },
  {
    keys: ["honey", "cinnamon"],
    tag: "AFTERNOON FOCUS",
    title: "Warm Spiced Ember",
    ratio: "1 sdm Raw Honey + 1/4 sdt bubuk kayu manis + 150 ml air hangat.",
    desc: "Kombinasi hangat dengan aroma rempah yang pas saat energi mulai turun.",
    ctaText: "Cek Raw Honey Cinnamonshot",
    url: "https://javahoney.id/?utm_source=jvhny.fun&utm_medium=mixer&utm_campaign=spiced_ember"
  },
  {
    keys: ["acacia", "ginger"],
    tag: "DEEP RECOVERY",
    title: "Dark Forest Shield",
    ratio: "1 sdm Acacia Black Honey + 3 iris jahe geprek + 150 ml air hangat.",
    desc: "Karakter madu gelap yang pekat dipadu jahe buat bantu jaga stamina.",
    ctaText: "Cek Acacia Black Honey",
    url: "https://javahoney.id/?utm_source=jvhny.fun&utm_medium=mixer&utm_campaign=dark_shield"
  },
  {
    keys: ["honey", "lemon", "mint"],
    tag: "COOL REFRESH",
    title: "Citrus Mint Cooler",
    ratio: "1 sdm Raw Honey + 1 sdm lemon + 5 lembar daun mint + es batu.",
    desc: "Sensasi segar lemon dan mint dengan manis alami yang seimbang.",
    ctaText: "Cek Raw Honey di Javahoney.id",
    url: "https://javahoney.id/?utm_source=jvhny.fun&utm_medium=mixer&utm_campaign=citrus_mint"
  }
];

let selected = [];

const ingredientsEl = document.getElementById("ingredients-list");
const glassCupEl = document.getElementById("glass-cup");
const liquidEl = document.getElementById("liquid-fill");
const selectedEl = document.getElementById("selected-ingredients");
const resultEl = document.getElementById("result-card");
const resetBtn = document.getElementById("reset-btn");

function ensureVisualLayer() {
  let layer = document.getElementById("topping-layer");
  if (!layer && glassCupEl) {
    layer = document.createElement("div");
    layer.id = "topping-layer";
    layer.className = "topping-layer";
    glassCupEl.appendChild(layer);
  }
  return layer;
}

function renderToppingVisuals(items) {
  const layer = ensureVisualLayer();
  if (!layer) return;

  layer.innerHTML = "";
  if (!items || items.length === 0) return;

  const hasLemon = items.some((s) => s.id === "lemon");
  const hasCinnamon = items.some((s) => s.id === "cinnamon");
  const hasMint = items.some((s) => s.id === "mint");
  const hasGinger = items.some((s) => s.id === "ginger");

  // 1. Potongan lemon melayang di permukaan/isi gelas
  if (hasLemon) {
    const lemonPositions = [
      { left: "14%", bottom: "26%", rot: "-18deg", size: 28 },
      { left: "56%", bottom: "42%", rot: "22deg", size: 24 }
    ];
    lemonPositions.forEach((pos) => {
      const slice = document.createElement("div");
      slice.className = "lemon-slice";
      slice.style.left = pos.left;
      slice.style.bottom = pos.bottom;
      slice.style.width = `${pos.size}px`;
      slice.style.height = `${pos.size}px`;
      slice.style.transform = `rotate(${pos.rot})`;
      layer.appendChild(slice);
    });
  }

  // 2. Efek agak keruh + butiran bubuk kayu manis
  if (hasCinnamon) {
    const haze = document.createElement("div");
    haze.className = "cinnamon-haze";
    layer.appendChild(haze);

    const specks = [
      { left: "18%", bottom: "14%", s: 3 },
      { left: "28%", bottom: "32%", s: 4 },
      { left: "38%", bottom: "20%", s: 2.5 },
      { left: "48%", bottom: "46%", s: 3.5 },
      { left: "60%", bottom: "24%", s: 3 },
      { left: "72%", bottom: "38%", s: 4 },
      { left: "80%", bottom: "16%", s: 2.5 },
      { left: "44%", bottom: "10%", s: 3.5 },
      { left: "66%", bottom: "54%", s: 3 },
      { left: "24%", bottom: "50%", s: 2.5 }
    ];
    specks.forEach((sp) => {
      const dot = document.createElement("span");
      dot.className = "cinnamon-speck";
      dot.style.left = sp.left;
      dot.style.bottom = sp.bottom;
      dot.style.width = `${sp.s}px`;
      dot.style.height = `${sp.s}px`;
      layer.appendChild(dot);
    });
  }

  // 3. Irisan jahe hangat
  if (hasGinger) {
    const ginger = document.createElement("div");
    ginger.className = "ginger-slice";
    ginger.style.left = "22%";
    ginger.style.bottom = "12%";
    ginger.style.transform = "rotate(12deg)";
    layer.appendChild(ginger);
  }

  // 4. Daun mint segar
  if (hasMint) {
    const leaves = [
      { left: "58%", bottom: "18%", rot: "28deg" },
      { left: "20%", bottom: "38%", rot: "-32deg" }
    ];
    leaves.forEach((lv) => {
      const leaf = document.createElement("div");
      leaf.className = "mint-leaf";
      leaf.style.left = lv.left;
      leaf.style.bottom = lv.bottom;
      leaf.style.transform = `rotate(${lv.rot})`;
      layer.appendChild(leaf);
    });
  }
}

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

function getLiquidColor(items) {
  if (!items || items.length === 0) return "#f59e0b";

  const hasHoney = items.some((s) => s.id === "honey");
  const hasAcacia = items.some((s) => s.id === "acacia");
  const hasCinnamon = items.some((s) => s.id === "cinnamon");
  const hasLemon = items.some((s) => s.id === "lemon");
  const hasMint = items.some((s) => s.id === "mint");

  if (hasCinnamon && hasAcacia) return "#6b3716";
  if (hasCinnamon) return "#b97329"; // Lebih keruh & hangat untuk kayu manis
  if (hasAcacia && hasHoney) return "#92400e";
  if (hasAcacia) return "#78350f";
  if (hasHoney && hasLemon && hasMint) return "#eab308";
  if (hasHoney && hasLemon) return "#fbbf24";
  if (hasHoney) return "#f59e0b";

  return items[items.length - 1].color;
}

function bindLeadForm(recipeTitle, ingredientsText) {
  const form = document.getElementById("lead-form");
  const submitBtn = document.getElementById("lead-submit-btn");
  const statusEl = document.getElementById("lead-status");
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const nama = document.getElementById("lead-name").value.trim();
    const wa = document.getElementById("lead-wa").value.trim();

    if (!nama || !wa) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Menyimpan...";
    statusEl.textContent = "";

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
          nama: nama,
          wa: wa,
          racikan: `${recipeTitle} (${ingredientsText})`
        })
      });

      const pesan = encodeURIComponent(
        `Halo Javahoney, gua ${nama} (${wa}). Barusan nyoba racikan "${recipeTitle}" (${ingredientsText}) di jvhny.fun. Kirimin panduan resep & info promonya ya!`
      );

      statusEl.innerHTML = `Berhasil disimpan, <strong>${nama}</strong>! Klik tombol di bawah buat langsung chat ke WA Javahoney:`;
      const waBtn = document.getElementById("wa-lead-btn");
      if (waBtn) {
        waBtn.href = `https://wa.me/6282252345650?text=${pesan}`;
        waBtn.style.display = "block";
      }
      submitBtn.textContent = "Tersimpan ✓";
    } catch (err) {
      statusEl.textContent = "Gagal nyimpen otomatis, tapi lo tetap bisa langsung lanjut ke WA di bawah:";
      submitBtn.disabled = false;
      submitBtn.textContent = "Coba Lagi";
    }
  };
}

function renderLeadFormHTML(recipeTitle, ingNames) {
  return `
    <form id="lead-form" class="lead-form">
      <p class="lead-title">Simpan &amp; Klaim Info Promo Racikan Ini:</p>
      <input id="lead-name" type="text" placeholder="Nama lo" required />
      <input id="lead-wa" type="tel" placeholder="No. WhatsApp (cth: 0812...)" required />
      <button id="lead-submit-btn" type="submit" class="btn-secondary">Simpan &amp; Klaim via WA</button>
      <div id="lead-status" class="lead-status"></div>
      <a id="wa-lead-btn" class="btn-primary btn-wa" style="display:none;" target="_blank" rel="noopener">Lanjut ke WhatsApp Javahoney</a>
    </form>
  `;
}

function updateUI() {
  renderIngredients();

  if (selected.length === 0) {
    selectedEl.textContent = "Belum ada bahan di gelas.";
    liquidEl.style.height = "0%";
    liquidEl.style.background = "transparent";
    renderToppingVisuals([]);
    resultEl.innerHTML = `
      <h3>3. Hasil Racikan</h3>
      <h2>Mulai racik minuman lo</h2>
      <p>Pilih minimal <strong>2 bahan</strong> (misal <em>Raw Honey + Lemon</em>) buat lihat kombinasi &amp; rekomendasinya.</p>
    `;
    return;
  }

  const ingNames = selected.map((s) => s.name).join(" + ");
  selectedEl.textContent = "Isi gelas: " + ingNames;

  const heightPct = Math.min(selected.length * 24, 92);
  const liquidColor = getLiquidColor(selected);

  liquidEl.style.height = `${heightPct}%`;
  liquidEl.style.background = liquidColor;
  renderToppingVisuals(selected);

  const ids = selected.map((s) => s.id);
  const match = findMatchingRecipe(ids);

  if (match) {
    resultEl.innerHTML = `
      <h3>3. Hasil Racikan</h3>
      <span class="recipe-tag">${match.tag}</span>
      <h2>${match.title}</h2>
      <p>${match.desc}</p>
      <div class="ratio-box">
        <strong>Takaran Saji:</strong> ${match.ratio}
      </div>
      <a class="btn-primary" href="${match.url}" target="_blank" rel="noopener">${match.ctaText}</a>
      ${renderLeadFormHTML(match.title, ingNames)}
    `;
    bindLeadForm(match.title, ingNames);
  } else if (selected.length >= 2) {
    const customTitle = `Eksperimen ${selected.length} Bahan`;
    resultEl.innerHTML = `
      <h3>3. Hasil Racikan</h3>
      <span class="recipe-tag">CUSTOM MIX</span>
      <h2>${customTitle}</h2>
      <p>Kombinasi unik! Mau dicatat atau dikonsultasikan takarannya ke tim Javahoney? Isi form di bawah atau cek katalog madu kami.</p>
      <a class="btn-primary" href="https://javahoney.id/?utm_source=jvhny.fun&utm_medium=mixer&utm_campaign=custom_mix" target="_blank" rel="noopener">Belanja Madu di Javahoney.id</a>
      ${renderLeadFormHTML(customTitle, ingNames)}
    `;
    bindLeadForm(customTitle, ingNames);
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
