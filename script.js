let gameState = "menu";

let player = {
    hp: 100,
    maxHp: 100,
    chakra: 30,
    maxChakra: 30,
    level: 1,
    xp: 0,
    xpToNext: 50,
    gold: 0
};

let enemyTypes = [
    { name: "Bandido", hp: 50, attack: 8, xp: 20, gold: 10 },
    { name: "Ninja Renegado", hp: 70, attack: 12, xp: 35, gold: 20 },
    { name: "Monstro da Névoa", hp: 90, attack: 15, xp: 50, gold: 30 }
];

let enemy;

let attackSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
let levelUpSound = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

function saveGame() {
    localStorage.setItem("ninjaSave", JSON.stringify(player));
}

function loadGame() {
    let save = localStorage.getItem("ninjaSave");
    if (save) player = JSON.parse(save);
}

function spawnEnemy() {
    let type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    enemy = { ...type };
}

function render() {
    const game = document.getElementById("game");

    if (gameState === "menu") {
        game.innerHTML = `
            <h1>Ninja Zeller</h1>
            <button onclick="startGame()">Iniciar</button>
        `;
    }

    if (gameState === "map") {
        game.innerHTML = `
            <h2>Mapa</h2>
            <p>⭐ Nível ${player.level} | 💰 ${player.gold} | XP ${player.xp}/${player.xpToNext}</p>
            <button onclick="goBattle()">Explorar</button>
            <button onclick="goShop()">Loja</button>
            <button onclick="goMenu()">Voltar</button>
        `;
    }

    if (gameState === "battle") {

        let playerPercent = (player.hp / player.maxHp) * 100;
        let enemyMaxHp = enemyTypes.find(e => e.name === enemy.name).hp;
        let enemyPercent = (enemy.hp / enemyMaxHp) * 100;
        let chakraPercent = (player.chakra / player.maxChakra) * 100;

        game.innerHTML = `
            <h2>Batalha</h2>

            <div class="character">
                <img src="https://i.imgur.com/6X4Z6Qx.png" class="sprite" id="playerSprite">
                <p>Jogador</p>
            </div>

            <div class="bar">
                <div class="fill" style="width:${playerPercent}%"></div>
            </div>

            <div class="bar">
                <div class="fill" style="width:${chakraPercent}%; background:#3498db;"></div>
            </div>

            <div class="character">
                <img src="https://i.imgur.com/Z6X7Y8L.png" class="sprite enemy" id="enemySprite">
                <p>${enemy.name}</p>
            </div>

            <div class="bar">
                <div class="fill enemy-fill" style="width:${enemyPercent}%"></div>
            </div>

            <button onclick="attack()">Atacar</button>
            <button onclick="special()">Jutsu (10 chakra)</button>
            <button onclick="backToMap()">Fugir</button>
        `;
    }

    if (gameState === "shop") {
        game.innerHTML = `
            <h2>Loja</h2>
            <p>💰 ${player.gold}</p>
            <button onclick="buyPotion()">Poção Vida (20 ouro)</button>
            <button onclick="buyChakra()">Poção Chakra (15 ouro)</button>
            <button onclick="backToMap()">Voltar</button>
        `;
    }
}

function startGame() {
    loadGame();
    gameState = "map";
    render();
}

function goMenu() {
    gameState = "menu";
    render();
}

function goBattle() {
    spawnEnemy();
    gameState = "battle";
    render();
}

function goShop() {
    gameState = "shop";
    render();
}

function backToMap() {
    saveGame();
    gameState = "map";
    render();
}

function attack() {
    attackSound.play();

    let damage = Math.floor(Math.random() * 15) + 5;

    if (Math.random() < 0.2) {
        damage *= 2;
        alert("CRÍTICO!");
    }

    enemy.hp -= damage;

    // animação no inimigo
    let enemySprite = document.getElementById("enemySprite");
    enemySprite.style.transform = "scale(1.2)";
    setTimeout(() => {
        enemySprite.style.transform = "scaleX(-1)";
    }, 200);

    if (enemy.hp <= 0) {
        winBattle();
        return;
    }

    enemyAttack();
    render();
}

function special() {
    if (player.chakra < 10) return;

    player.chakra -= 10;
    attackSound.play();

    let damage = Math.floor(Math.random() * 25) + 15;
    enemy.hp -= damage;

    if (enemy.hp <= 0) {
        winBattle();
        return;
    }

    enemyAttack();
    render();
}

function enemyAttack() {
    player.hp -= enemy.attack;

    let game = document.getElementById("game");
    game.classList.add("shake");
    setTimeout(() => game.classList.remove("shake"), 300);

    if (player.hp <= 0) {
        player.hp = player.maxHp;
        player.chakra = player.maxChakra;
        gameState = "menu";
    }
}

function winBattle() {
    player.xp += enemy.xp;
    player.gold += enemy.gold;
    player.chakra = player.maxChakra;

    levelUpCheck();
    saveGame();
    gameState = "map";
    render();
}

function levelUpCheck() {
    if (player.xp >= player.xpToNext) {
        player.xp -= player.xpToNext;
        player.level++;
        player.maxHp += 20;
        player.maxChakra += 5;
        player.hp = player.maxHp;
        player.chakra = player.maxChakra;
        player.xpToNext += 30;

        levelUpSound.play();
        alert("LEVEL UP!");
    }
}

function buyPotion() {
    if (player.gold >= 20) {
        player.gold -= 20;
        player.hp = player.maxHp;
        saveGame();
        render();
    }
}

function buyChakra() {
    if (player.gold >= 15) {
        player.gold -= 15;
        player.chakra = player.maxChakra;
        saveGame();
        render();
    }
}

render();
