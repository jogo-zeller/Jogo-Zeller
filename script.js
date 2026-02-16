let gameState = "menu";

let player = {
    hp: 100,
    maxHp: 100,
    chakra: 30,
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
            <p>💰 Ouro: ${player.gold}</p>
            <button onclick="goBattle()">Explorar</button>
            <button onclick="goShop()">Loja</button>
            <button onclick="goMenu()">Voltar</button>
        `;
    }

    if (gameState === "battle") {
        game.innerHTML = `
            <h2>Batalha</h2>
            <p>❤️ ${player.hp}/${player.maxHp} | 🔵 ${player.chakra}</p>
            <p>👹 ${enemy.name} - ❤️ ${enemy.hp}</p>
            <button onclick="attack()">Atacar</button>
            <button onclick="backToMap()">Fugir</button>
        `;
    }

    if (gameState === "shop") {
        game.innerHTML = `
            <h2>Loja</h2>
            <p>💰 ${player.gold}</p>
            <button onclick="buyPotion()">Poção (20 ouro)</button>
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
    let damage = Math.floor(Math.random() * 15) + 5;
    enemy.hp -= damage;

    if (enemy.hp <= 0) {
        player.xp += enemy.xp;
        player.gold += enemy.gold;
        levelUpCheck();
        saveGame();
        gameState = "map";
    } else {
        player.hp -= enemy.attack;
        if (player.hp <= 0) {
            player.hp = player.maxHp;
            gameState = "menu";
        }
    }

    render();
}

function levelUpCheck() {
    if (player.xp >= player.xpToNext) {
        player.xp -= player.xpToNext;
        player.level++;
        player.maxHp += 20;
        player.hp = player.maxHp;
        player.xpToNext += 30;
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

render();
