let player = {
    name: "Ninja",
    hp: 100,
    chakra: 50,
    level: 1,
    xp: 0
};

let enemy = {
    hp: 80
};

function startGame() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    updateUI();
}

function updateUI() {
    document.getElementById("playerName").innerText = player.name;
    document.getElementById("playerHP").innerText = player.hp;
    document.getElementById("playerChakra").innerText = player.chakra;
    document.getElementById("playerLevel").innerText = player.level;
    document.getElementById("enemyHP").innerText = enemy.hp;
}

function attack() {
    let damage = Math.floor(Math.random() * 15) + 5;
    enemy.hp -= damage;

    document.getElementById("log").innerText = 
        "Você causou " + damage + " de dano!";

    enemyTurn();
    checkBattle();
    updateUI();
}

function special() {
    if (player.chakra >= 10) {
        let damage = Math.floor(Math.random() * 25) + 10;
        enemy.hp -= damage;
        player.chakra -= 10;

        document.getElementById("log").innerText = 
            "Jutsu causou " + damage + " de dano!";
    } else {
        document.getElementById("log").innerText = 
            "Chakra insuficiente!";
        return;
    }

    enemyTurn();
    checkBattle();
    updateUI();
}

function heal() {
    if (player.chakra >= 5) {
        let healAmount = Math.floor(Math.random() * 20) + 10;
        player.hp += healAmount;
        player.chakra -= 5;

        document.getElementById("log").innerText = 
            "Você curou " + healAmount + " de vida!";
    } else {
        document.getElementById("log").innerText = 
            "Chakra insuficiente!";
        return;
    }

    enemyTurn();
    updateUI();
}

function enemyTurn() {
    let damage = Math.floor(Math.random() * 12) + 5;
    player.hp -= damage;
}

function checkBattle() {
    if (enemy.hp <= 0) {
        player.xp += 20;
        enemy.hp = 80;
        document.getElementById("log").innerText = 
            "Você venceu! +20 XP";

        if (player.xp >= 50) {
            levelUp();
        }
    }

    if (player.hp <= 0) {
        alert("Game Over!");
        location.reload();
    }
}

function levelUp() {
    player.level++;
    player.hp += 30;
    player.chakra += 20;
    player.xp = 0;
    alert("Você subiu de nível!");
}
