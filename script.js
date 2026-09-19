var menu = [
  { name: "ข้าวผัดกะเพราหมู", emoji: "🌶️", price: 1, moods: ["เผ็ดร้อน","อิ่มท้อง"], tags: ["หมู"] },
  { name: "ต้มยำกุ้ง", emoji: "🍤", price: 2, moods: ["เผ็ดร้อน","สุขภาพดี"], tags: ["อาหารทะเล"] },
  { name: "ส้มตำไทย", emoji: "🥗", price: 1, moods: ["เผ็ดร้อน","สุขภาพดี"], tags: [] },
  { name: "ข้าวมันไก่", emoji: "🍗", price: 1, moods: ["สบายๆ","อิ่มท้อง"], tags: [] },
  { name: "ผัดไทยกุ้งสด", emoji: "🍜", price: 2, moods: ["สบายๆ","อิ่มท้อง"], tags: ["อาหารทะเล"] },
  { name: "แกงเขียวหวานไก่", emoji: "🍛", price: 2, moods: ["อิ่มท้อง"], tags: ["กะทิ"] },
  { name: "ข้าวขาหมู", emoji: "🍖", price: 2, moods: ["อิ่มท้อง","สบายๆ"], tags: ["หมู"] },
  { name: "สุกี้น้ำทะเล", emoji: "🍲", price: 2, moods: ["สุขภาพดี","อิ่มท้อง"], tags: ["อาหารทะเล"] },
  { name: "ก๋วยเตี๋ยวเนื้อตุ๋น", emoji: "🍜", price: 2, moods: ["สบายๆ","อิ่มท้อง"], tags: ["เนื้อวัว"] },
  { name: "ยำวุ้นเส้น", emoji: "🥗", price: 1, moods: ["เผ็ดร้อน","สุขภาพดี"], tags: ["อาหารทะเล"] },
  { name: "ข้าวคลุกกะปิ", emoji: "🍚", price: 1, moods: ["เผ็ดร้อน"], tags: ["อาหารทะเล"] },
  { name: "สลัดโรล", emoji: "🥙", price: 1, moods: ["สุขภาพดี"], tags: [] },
  { name: "ข้าวหน้าไก่ทอด", emoji: "🍗", price: 1, moods: ["อิ่มท้อง"], tags: [] },
  { name: "บะหมี่เกี๊ยวหมูแดง", emoji: "🍜", price: 2, moods: ["สบายๆ","อิ่มท้อง"], tags: ["หมู"] },
  { name: "เนื้อย่างเกาหลี", emoji: "🥩", price: 3, moods: ["เผ็ดร้อน","อิ่มท้อง"], tags: ["เนื้อวัว"] },
  { name: "ชาบูหมูสไตล์ญี่ปุ่น", emoji: "🍲", price: 3, moods: ["อิ่มท้อง","สุขภาพดี"], tags: ["หมู"] },
  { name: "พิซซ่าหน้ารวม", emoji: "🍕", price: 3, moods: ["สบายๆ","อิ่มท้อง"], tags: [] },
  { name: "สปาเก็ตตี้คาโบนาร่า", emoji: "🍝", price: 2, moods: ["สบายๆ"], tags: ["หมู"] },
  { name: "ชานมไข่มุก คู่ขนมปังปิ้ง", emoji: "🧋", price: 1, moods: ["หวานๆ"], tags: [] },
  { name: "บิงซูผลไม้รวม", emoji: "🍧", price: 2, moods: ["หวานๆ","สุขภาพดี"], tags: [] },
  { name: "เค้กช็อกโกแลตลาวา", emoji: "🍫", price: 2, moods: ["หวานๆ"], tags: [] },
  { name: "ขนมครกกะทิสด", emoji: "🥥", price: 1, moods: ["หวานๆ"], tags: ["กะทิ"] },
  { name: "สมูทตี้โบวล์ผลไม้", emoji: "🍓", price: 2, moods: ["สุขภาพดี","หวานๆ"], tags: [] },
  { name: "สเต็กปลาแซลมอนซอสเลม่อน", emoji: "🐟", price: 3, moods: ["สุขภาพดี","อิ่มท้อง"], tags: ["อาหารทะเล"] }
];

var priceLabel = { 1: "ประหยัด (ต่ำกว่า 50฿)", 2: "ปานกลาง (50-100฿)", 3: "จัดเต็ม (มากกว่า 100฿)" };

var rollBtn = document.getElementById("roll");
var ticket = document.getElementById("ticket");
var errorMsg = document.getElementById("errorMsg");

function getSelectedBudget() {
  var radios = document.querySelectorAll('input[name="budget"]');
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) return radios[i].value;
  }
  return "any";
}

function getExcluded() {
  var boxes = document.querySelectorAll('#exclude input[type="checkbox"]');
  var out = [];
  boxes.forEach(function (b) { if (b.checked) out.push(b.value); });
  return out;
}

function renderTicket(item) {
  var tagsHtml = item.moods.map(function (m) { return '<span>' + m + '</span>'; }).join("");
  ticket.innerHTML =
    '<div class="ticket-emoji">' + item.emoji + '</div>' +
    '<p class="ticket-name">' + item.name + '</p>' +
    '<div class="ticket-tags">' + tagsHtml + '</div>' +
    '<p class="ticket-price">' + priceLabel[item.price] + '</p>' +
    '<p class="ticket-count" id="ticketCount"></p>';
}

function roll() {
  errorMsg.style.display = "none";

  var mood = document.getElementById("mood").value;
  var budget = getSelectedBudget();
  var excluded = getExcluded();

  var pool = menu.filter(function (item) {
    var moodOk = mood === "any" || item.moods.indexOf(mood) !== -1;
    var budgetOk = budget === "any" || String(item.price) === budget;
    var excludeOk = excluded.every(function (tag) { return item.tags.indexOf(tag) === -1; });
    return moodOk && budgetOk && excludeOk;
  });

  if (pool.length === 0) {
    errorMsg.style.display = "block";
    return;
  }

  var pick = pool[Math.floor(Math.random() * pool.length)];

  ticket.classList.remove("rolling");
  void ticket.offsetWidth;
  ticket.classList.add("rolling");

  renderTicket(pick);
  var countEl = document.getElementById("ticketCount");
  if (countEl) countEl.textContent = "ตรงเงื่อนไข " + pool.length + " เมนู เลือกมาให้ 1 อย่าง";
}

rollBtn.addEventListener("click", roll);
