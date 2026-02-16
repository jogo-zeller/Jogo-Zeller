let player = {
    name: "",
    clan: "",
    maxHP: 100,
    hp: 100,
    maxChakra: 50,
    chakra: 50
};

let enemy = {
    maxHP: 100,
    hp: 100
};

function startGame() {
    player.name = document.getElementById("nameInput").value;
    player.clan = document.getElementById("clanSelect").value;

    if (player.name === "") {
        alert("Digite seu nome!");
        return;
    }

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    document.getElementById("playerInfo").innerText =
        player.name + " - Clã " + player.clan;

    updateBars();
}

function updateBars() {
    document.getElementById("playerHPBar").style.width =
        (player.hp / player.maxHP) * 100 + "%";

    document.getElementById("playerChakraBar").style.width =
        (player.chakra / player.maxChakra) * 100 + "%";

    document.getElementById("enemyHPBar").style.width =
        (enemy.hp / enemy.maxHP) * 100 + "%";
}

function attack() {
    let damage = Math.floor(Math.random() * 15) + 5;
    enemy.hp -= damage;

    log("Você causou " + damage + " de dano!");

    enemyTurn();
    checkBattle();
    updateBars();
}

function special() {
    if (player.chakra < 10) {
        log("Chakra insuficiente!");
        return;
    }

    let damage = Math.floor(Math.random() * 30) + 10;
    enemy.hp -= damage;
    player.chakra -= 10;

    log("Ataque especial causou " + damage + " de dano!");

    enemyTurn();
    checkBattle();
    updateBars();
}

function heal() {
    if (player.chakra < 5) {
        log("Chakra insuficiente!");
        return;
    }

    let healAmount = Math.floor(Math.random() * 20) + 10;
    player.hp += healAmount;
    player.chakra -= 5;

    if (player.hp > player.maxHP) player.hp = player.maxHP;

    log("Você recuperou " + healAmount + " de vida!");

    enemyTurn();
    updateBars();
}

function enemyTurn() {
    let damage = Math.floor(Math.random() * 12) + 5;
    player.hp -= damage;

    if (player.hp < 0) player.hp = 0;
}

function checkBattle() {
    if (enemy.hp <= 0) {
        alert("Você venceu!");
        enemy.hp = enemy.maxHP;
    }

    if (player.hp <= 0) {
        alert("Game Over!");
        location.reload();
    }
}

function log(text) {
    document.getElementById("log").innerText = text;
}
