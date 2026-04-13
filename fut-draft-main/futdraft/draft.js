// draft.js

const formations = {
    '442': [
        { label: 'GK', top: '88%', left: '50%' },
        { label: 'LB', top: '70%', left: '25%' },
        { label: 'CB', top: '72%', left: '40%' },
        { label: 'CB', top: '72%', left: '60%' },
        { label: 'RB', top: '70%', left: '75%' },
        { label: 'LM', top: '45%', left: '30%' },
        { label: 'CM', top: '45%', left: '42%' },
        { label: 'CM', top: '45%', left: '58%' },
        { label: 'RM', top: '45%', left: '70%' },
        { label: 'ST', top: '25%', left: '42%' },
        { label: 'ST', top: '25%', left: '58%' }
    ],
    '433': [
        { label: 'GK', top: '88%', left: '50%' },
        { label: 'LB', top: '70%', left: '25%' },
        { label: 'CB', top: '72%', left: '40%' },
        { label: 'CB', top: '72%', left: '60%' },
        { label: 'RB', top: '70%', left: '75%' },
        { label: 'CM', top: '50%', left: '35%' },
        { label: 'CM', top: '55%', left: '50%' },
        { label: 'CM', top: '50%', left: '65%' },
        { label: 'LW', top: '28%', left: '35%' },
        { label: 'ST', top: '22%', left: '50%' },
        { label: 'RW', top: '28%', left: '65%' }
    ],
    '352': [
        { label: 'GK', top: '88%', left: '50%' },
        { label: 'CB', top: '72%', left: '35%' },
        { label: 'CB', top: '75%', left: '50%' },
        { label: 'CB', top: '72%', left: '65%' },
        { label: 'LM', top: '50%', left: '30%' },
        { label: 'CM', top: '55%', left: '42%' },
        { label: 'CAM', top: '40%', left: '50%' },
        { label: 'CM', top: '55%', left: '58%' },
        { label: 'RM', top: '50%', left: '70%' },
        { label: 'ST', top: '25%', left: '42%' },
        { label: 'ST', top: '25%', left: '58%' }
    ],
    '4231': [
        { label: 'GK', top: '88%', left: '50%' },
        { label: 'LB', top: '70%', left: '25%' },
        { label: 'CB', top: '72%', left: '40%' },
        { label: 'CB', top: '72%', left: '60%' },
        { label: 'RB', top: '70%', left: '75%' },
        { label: 'CDM', top: '58%', left: '42%' },
        { label: 'CDM', top: '58%', left: '58%' },
        { label: 'LAM', top: '42%', left: '35%' },
        { label: 'CAM', top: '40%', left: '50%' },
        { label: 'RAM', top: '42%', left: '65%' },
        { label: 'ST', top: '25%', left: '50%' }
    ],
    '3412': [
        { label: 'GK', top: '88%', left: '50%' },
        { label: 'CB', top: '72%', left: '35%' },
        { label: 'CB', top: '75%', left: '50%' },
        { label: 'CB', top: '72%', left: '65%' },
        { label: 'LM', top: '50%', left: '28%' },
        { label: 'CM', top: '55%', left: '42%' },
        { label: 'CM', top: '55%', left: '58%' },
        { label: 'RM', top: '50%', left: '72%' },
        { label: 'CAM', top: '38%', left: '50%' },
        { label: 'ST', top: '25%', left: '42%' },
        { label: 'ST', top: '25%', left: '58%' }
    ],
    '442_2': [
        { label: 'GK', top: '88%', left: '50%' },
        { label: 'LB', top: '70%', left: '25%' },
        { label: 'CB', top: '72%', left: '40%' },
        { label: 'CB', top: '72%', left: '60%' },
        { label: 'RB', top: '70%', left: '75%' },
        { label: 'CDM', top: '58%', left: '42%' },
        { label: 'CDM', top: '58%', left: '58%' },
        { label: 'LM', top: '42%', left: '30%' },
        { label: 'RM', top: '42%', left: '70%' },
        { label: 'ST', top: '25%', left: '42%' },
        { label: 'ST', top: '25%', left: '58%' }
    ],
    '4141': [
        { label: 'GK', top: '88%', left: '50%' },
        { label: 'LB', top: '70%', left: '25%' },
        { label: 'CB', top: '72%', left: '40%' },
        { label: 'CB', top: '72%', left: '60%' },
        { label: 'RB', top: '70%', left: '75%' },
        { label: 'CDM', top: '60%', left: '50%' },
        { label: 'LM', top: '45%', left: '30%' },
        { label: 'CM', top: '45%', left: '42%' },
        { label: 'CM', top: '45%', left: '58%' },
        { label: 'RM', top: '45%', left: '70%' },
        { label: 'ST', top: '25%', left: '50%' }
    ]
};

let teamPlayers = new Array(11).fill(null);
let activeSlotIndex = null;
let activeFormation = null;

const randomNames = ["Smith", "Ronaldo", "Messi", "Mbappe", "Haaland", "De Bruyne", "Van Dijk", "Alisson", "Ederson", "Bellingham", "Vinicius", "Kane", "Saka", "Foden", "Modric", "Kroos"];

function generateRandomPlayers(position) {
    const players = [];
    for (let i = 0; i < 5; i++) {
        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)] + ' ' + String.fromCharCode(65 + Math.floor(Math.random() * 26));
        players.push({
            name: randomName,
            rating: Math.floor(Math.random() * 15) + 80, // 80 - 94 rating
            position: position
        });
    }
    return players;
}

function selectFormation(formationId) {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('reset-btn').style.display = 'block';
    document.getElementById('draft-hud').style.display = 'flex';
    activeFormation = formationId;
    teamPlayers = new Array(11).fill(null);
    checkDraftCompletion();
    renderFormation(formationId);
}

function renderFormation(formationId) {
    const container = document.getElementById('players-container');
    container.innerHTML = ''; // Clear previous formation

    const positions = formations[formationId];

    for (let i = 0; i < positions.length; i++) {
        const pos = positions[i];
        
        const slot = document.createElement('div');
        slot.className = 'player-slot';
        slot.style.top = pos.top;
        slot.style.left = pos.left;
        slot.innerHTML = '+';
        slot.title = pos.label;
        slot.style.backgroundColor = '#ffffff';
        
        slot.onclick = function() {
            openPlayerModal(pos.label, i);
        };

        container.appendChild(slot);
    }
}

function openPlayerModal(position, slotIndex) {
    activeSlotIndex = slotIndex;
    document.getElementById('player-modal-title').innerText = "Select " + position + " Player";
    const optionsGrid = document.getElementById('player-options-grid');
    optionsGrid.innerHTML = '';
    
    const choices = generateRandomPlayers(position);
    
    choices.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-choice-card';
        card.innerHTML = `
            <div style="font-size: 26px; font-weight: bold; color: #ea580c;">${player.rating}</div>
            <div style="font-size: 14px; font-weight: bold; margin-bottom: 5px;">${player.position}</div>
            <div style="font-size: 13px;">${player.name}</div>
        `;
        card.onclick = () => selectPlayerForSlot(player);
        optionsGrid.appendChild(card);
    });
    
    document.getElementById('player-modal').style.display = 'flex';
}

function closePlayerModal() {
    document.getElementById('player-modal').style.display = 'none';
    activeSlotIndex = null;
}

function selectPlayerForSlot(player) {
    teamPlayers[activeSlotIndex] = player;
    
    const slots = document.querySelectorAll('.player-slot');
    const slot = slots[activeSlotIndex];
    
    let displayName = player.name;
    if (displayName.length > 8) {
        displayName = displayName.substring(0, 8) + '..';
    }
    
    slot.innerHTML = `<span style="font-size: 16px; font-weight:bold;">${player.rating}</span><br><span style="font-size: 10px;">${displayName}</span>`;
    slot.style.backgroundColor = '#fca5a5';
    
    closePlayerModal();
    checkDraftCompletion();
}

function checkDraftCompletion() {
    let filledCount = 0;
    let totalRating = 0;
    teamPlayers.forEach(p => {
        if(p) {
            filledCount++;
            totalRating += p.rating;
        }
    });
    
    if (filledCount === 11) {
        let average = Math.round(totalRating / 11);
        document.getElementById('team-rating').innerText = average;
        document.getElementById('save-draft-btn').style.display = 'inline-block';
    } else {
        document.getElementById('team-rating').innerText = "0";
        document.getElementById('save-draft-btn').style.display = 'none';
    }
}

function saveDraft() {
    const draft = {
        formation: activeFormation,
        players: teamPlayers,
        rating: document.getElementById('team-rating').innerText,
        date: new Date().toLocaleString()
    };
    
    let savedDrafts = JSON.parse(localStorage.getItem('savedDrafts') || '[]');
    savedDrafts.push(draft);
    localStorage.setItem('savedDrafts', JSON.stringify(savedDrafts));
    
    alert("Draft Saved Successfully!");
    loadSavedDrafts();
}

function loadSavedDrafts() {
    const container = document.getElementById('saved-drafts-list');
    if (!container) return;
    container.innerHTML = '';
    
    let savedDrafts = JSON.parse(localStorage.getItem('savedDrafts') || '[]');
    savedDrafts.forEach((draft) => {
        const card = document.createElement('div');
        card.className = 'formation-card';
        card.style.width = '160px';
        card.style.height = 'auto';
        card.style.cursor = 'default';
        card.style.padding = '15px';
        card.style.backgroundColor = '#fff';
        card.innerHTML = `
            <div style="font-size: 11px; color: #888; margin-bottom: 5px;">${draft.date}</div>
            <h4 style="margin: 0; color: #334155;">Formation: ${draft.formation}</h4>
            <h2 style="margin: 5px 0; color: #ea580c;">Rating: ${draft.rating}</h2>
        `;
        container.appendChild(card);
    });
}

function resetDraft() {
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('reset-btn').style.display = 'none';
    document.getElementById('draft-hud').style.display = 'none';
    document.getElementById('players-container').innerHTML = '';
    teamPlayers = new Array(11).fill(null);
    activeFormation = null;
}

// Initial load
loadSavedDrafts();
