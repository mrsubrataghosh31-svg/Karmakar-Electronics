// Karmakar Electric — edit this number before publishing.
// Use country code without +. Example: 919876543210
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

const products = {
  "Ceiling Fan": { category: "FANS", image: "assets/fan.png", description: "A dependable cooling essential for your home. Ask us about available brands, sizes, colours and pricing." },
  "LED Bulb": { category: "LIGHTING", image: "assets/bulb.png", description: "Bright, efficient lighting for everyday spaces. Contact the store to check wattage options and availability." },
  "Mixer Grinder": { category: "APPLIANCES", image: "assets/mixer.png", description: "A practical kitchen companion for daily preparation. Ask about available models, features and pricing." },
  "Table Fan": { category: "FANS", image: "assets/tablefan.png", description: "Compact cooling for desks and smaller spaces. Contact us to explore available models." },
  "Smart LED TV": { category: "ELECTRONICS", image: "assets/tv.png", description: "Bring entertainment home. Ask us about screen sizes, smart features, brands and current availability." }
};

const grid = document.getElementById("productGrid");
const cards = [...document.querySelectorAll(".product-card")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const searchInput = document.getElementById("productSearch");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("modalBackdrop");
const inquiry = new Set();
let activeProduct = "Ceiling Fan";

function filterProducts(category = "All") {
  let visible = 0;
  const term = searchInput.value.trim().toLowerCase();
  cards.forEach(card => {
    const matchesCategory = category === "All" || card.dataset.category === category;
    const matchesSearch = card.dataset.name.toLowerCase().includes(term) || card.dataset.category.toLowerCase().includes(term);
    const show = matchesCategory && matchesSearch;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
  filterButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.filter === category));
}

filterButtons.forEach(btn => btn.addEventListener("click", () => filterProducts(btn.dataset.filter)));
document.querySelectorAll(".category-card").forEach(btn => btn.addEventListener("click", () => {
  document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
  filterProducts(btn.dataset.filter);
}));
searchInput.addEventListener("input", () => {
  const active = document.querySelector(".filter-btn.active")?.dataset.filter || "All";
  filterProducts(active);
});

function openProduct(name) {
  const product = products[name];
  if (!product) return;
  activeProduct = name;
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalImage").alt = name;
  document.getElementById("modalCategory").textContent = product.category;
  document.getElementById("modalTitle").textContent = name;
  document.getElementById("modalDescription").textContent = product.description;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}
document.querySelectorAll(".quick-view").forEach(btn => btn.addEventListener("click", () => openProduct(btn.dataset.product)));
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

function updateInquiry() {
  const drawer = document.getElementById("inquiryDrawer");
  const count = document.getElementById("inquiryCount");
  const items = document.getElementById("inquiryItems");
  const send = document.getElementById("sendInquiry");
  count.textContent = `${inquiry.size} item${inquiry.size === 1 ? "" : "s"}`;
  items.textContent = inquiry.size ? [...inquiry].join(" • ") : "Add products to prepare an enquiry.";
  send.disabled = inquiry.size === 0;
  drawer.classList.toggle("visible", inquiry.size > 0);
}
document.querySelectorAll(".add-inquiry").forEach(btn => btn.addEventListener("click", () => {
  inquiry.add(btn.dataset.product);
  updateInquiry();
  btn.textContent = "✓";
  setTimeout(() => { btn.textContent = "+"; }, 900);
}));
function sendWhatsApp(message) {
  if (!/^91\d{10}$/.test(WHATSAPP_NUMBER)) {
    alert("Please add your 10-digit WhatsApp number with country code in script.js before using enquiries.");
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}
document.getElementById("sendInquiry").addEventListener("click", () => {
  sendWhatsApp(`Hello Karmakar Electric! I would like to enquire about: ${[...inquiry].join(", ")}.`);
});
document.getElementById("modalEnquire").addEventListener("click", () => {
  closeModal();
  sendWhatsApp(`Hello Karmakar Electric! Please share details and pricing for ${activeProduct}.`);
});
document.getElementById("whatsappLink").addEventListener("click", event => {
  event.preventDefault();
  sendWhatsApp("Hello Karmakar Electric! I would like to know more about your products.");
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));
const sections = [...document.querySelectorAll("main section[id]")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("modalEnquire").textContent = "Enquire about this →";
