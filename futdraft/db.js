document.getElementById('btn-players').addEventListener('click', function () {
    this.classList.add('active');
    document.getElementById('btn-gk').classList.remove('active');
    updateFilters('players');
});

document.getElementById('btn-gk').addEventListener('click', function () {
    this.classList.add('active');
    document.getElementById('btn-players').classList.remove('active');
    updateFilters('gk');
});

function attachFilterListeners() {
    const attrBtns = document.querySelectorAll('.attr-btn');
    attrBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            attrBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function updateFilters(type) {
    const filterContainer = document.getElementById('attr-filter');
    if (type === 'gk') {
        filterContainer.innerHTML = `
            <button class="attr-btn active">Base</button>
            <button class="attr-btn">Diving</button>
            <button class="attr-btn">Handling</button>
            <button class="attr-btn">Kicking</button>
            <button class="attr-btn">Reflexes</button>
            <button class="attr-btn">Speed</button>
            <button class="attr-btn">Positioning</button>
        `;
    } else {
        filterContainer.innerHTML = `
            <button class="attr-btn active">Base</button>
            <button class="attr-btn">Pace</button>
            <button class="attr-btn">Shooting</button>
            <button class="attr-btn">Passing</button>
            <button class="attr-btn">Dribbling</button>
            <button class="attr-btn">Defending</button>
            <button class="attr-btn">Physicality</button>
        `;
    }
    attachFilterListeners();
}
attachFilterListeners();
