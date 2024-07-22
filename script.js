document.addEventListener('DOMContentLoaded', () => {
    const mainBtn = document.getElementById('mainBtn');
    const counter = document.getElementById('counter');

    const upgrade1Btn = document.getElementById('upgrade1');
    const upgrade2Btn = document.getElementById('upgrade2');
    const upgrade3Btn = document.getElementById('upgrade3');
    const upgrade4Btn = document.getElementById('upgrade4');
    const upgrade5Btn = document.getElementById('upgrade5');

    const research1Btn = document.getElementById('research1');
    const research2Btn = document.getElementById('research2');

    const upgradesBtn = document.getElementById('upgradesBtn');
    const researchBtn = document.getElementById('researchBtn');
    const settingsBtn = document.getElementById('settingsBtn');

    const upgMenu = document.getElementById('upgMenu');
    const resMenu = document.getElementById('resMenu');
    const setMenu = document.getElementById('setMenu');

    let count = 0;
    let increment = 1;  // Initial increment value
    let multi = 1; // Initial multi value
    let cost1 = 10; // Cost for the first upgrade
    let cost2 = 100; // Cost for the second upgrade
    let cost3 = 1000; // Cost for the third upgrade
    let cost4 = 10000; // Cost for the fourth upgrade
    let cost5 = 100000; // Cost for the fifth upgrade
    let soundEnabled = true; // Sound is enabled by default

    let research1Count = 0; // Count for the first research upgrade
    let research2Count = 0; // Count for the second research upgrade

    const research1Max = 3; // Max times research1 can be bought
    const research2Max = 2; // Max times research2 can be bought

    const muteBtn = document.getElementById('muteBtn');
    let isMuted = false;

    muteBtn.addEventListener('click', () => {
    if (isMuted) {
        backgroundMusic.volume = 1; // Unmute
        muteBtn.textContent = 'Mute';
    } else {
        backgroundMusic.volume = 0; // Mute
        muteBtn.textContent = 'Unmute';
    }
    isMuted = !isMuted;
    });

    // Access the audio element
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Play the music
    function playMusic() {
    backgroundMusic.play();
    }   

    playMusic();


    function updateUpgradeButton(upgradeBtn, cost, incrementValue) {
        upgradeBtn.textContent = `Add ${incrementValue} to base (Cost: ${Math.round(cost)})`;
    }

    function updateResearchButton(researchBtn, cost, max, count) {
        researchBtn.textContent = `${researchBtn.textContent.split(' (Cost')[0]} (Cost: ${Math.round(cost)}) [${count}/${max}]`;
    }

    function unlockPassiveUpgrades() {
        upgrade6Btn.style.display = 'block';
        upgrade7Btn.style.display = 'block';
        upgrade8Btn.style.display = 'block';
        upgrade9Btn.style.display = 'block';
        upgrade10Btn.style.display = 'block';
    }

    //Prestige code

    const prestigeBtn = document.getElementById('prestigeBtn');
    let prestigeMultiplier = 1;
    let prestigeCount = 0;

    function prestige() {
        if (count >= 1e9) {
            prestigeCount++;
            prestigeMultiplier += 0.1;
            count = 0;
            increment = 1;
            resetUpgradesAndResearch();
            updateUI();
        } else {
            alert("You need at least 1 billion money to prestige.");
        }
    }

    function resetUpgradesAndResearch() {
        // Example variables for upgrades and research
        let baseUpgrades = [10, 100, 1000, 10000, 100000];
        let passiveUpgrades = [10, 100, 1000, 10000, 100000];
    
        // Reset base upgrades and passive income upgrades
        baseUpgrades.forEach((_, index) => {
            document.getElementById(`upgrade${index + 1}`).disabled = false;
        });
    
        passiveUpgrades.forEach((_, index) => {
            document.getElementById(`upgrade${index + 6}`).disabled = false;
        });
    
        // Reset research upgrades
        document.getElementById('research1').dataset.count = 0;
        document.getElementById('research2').dataset.count = 0;
        document.getElementById('research3').dataset.count = 0;
    
        // Update research buttons and costs if needed
        document.getElementById('research1').textContent = 'Reduce base upgrade costs (Cost: 500) [0/3]';
        document.getElementById('research2').textContent = 'Increase multiplier (Cost: 1000) [0/2]';
        document.getElementById('research3').textContent = 'Unlock Passive Income Upgrades (Cost: 50000) [0/1]';
    
        // Reset any other game state variables related to upgrades and research
        // For example:
        document.getElementById('upgrade6').disabled = true;
        document.getElementById('upgrade7').disabled = true;
        document.getElementById('upgrade8').disabled = true;
        document.getElementById('upgrade9').disabled = true;
        document.getElementById('upgrade10').disabled = true;
    }
    

    function updateUI() {
        counter.textContent = `Money: ${Math.round(count)}`;
        // Update other UI elements
    }

    prestigeBtn.addEventListener('click', prestige);


    mainBtn.addEventListener('click', () => {
        count += increment * multi;
        counter.textContent = `Money: ${count}`;
        updateProgressBar(); // Update the progress bar
    });

    upgrade1Btn.addEventListener('click', () => {
        if (count >= cost1) {
            count -= cost1;
            increment += 1;
            cost1 *= 1.35;
            counter.textContent = `Money: ${count}`;
            updateUpgradeButton(upgrade1Btn, cost1, 1);
        }
    });

    upgrade2Btn.addEventListener('click', () => {
        if (count >= cost2) {
            count -= cost2;
            increment += 5;
            cost2 *= 1.35;
            counter.textContent = `Money: ${count}`;
            updateUpgradeButton(upgrade2Btn, cost2, 2);
        }
    });

    upgrade3Btn.addEventListener('click', () => {
        if (count >= cost3) {
            count -= cost3;
            increment += 10;
            cost3 *= 1.35;
            counter.textContent = `Money: ${count}`;
            updateUpgradeButton(upgrade3Btn, cost3, 3);
        }
    });

    upgrade4Btn.addEventListener('click', () => {
        if (count >= cost4) {
            count -= cost4;
            increment += 20;
            cost4 *= 1.35;
            counter.textContent = `Money: ${count}`;
            updateUpgradeButton(upgrade4Btn, cost4, 4);
        }
    });

    upgrade5Btn.addEventListener('click', () => {
        if (count >= cost5) {
            count -= cost5;
            increment += 50;
            cost5 *= 1.35;
            counter.textContent = `Money: ${count}`;
            updateUpgradeButton(upgrade5Btn, cost5, 5);
        }
    });

    research1Btn.addEventListener('click', () => {
        if (count >= 500 && research1Count < research1Max) {
            count -= 500;
            cost1 *= 0.9;
            cost2 *= 0.9;
            cost3 *= 0.9;
            cost4 *= 0.9;
            cost5 *= 0.9;
            research1Count += 1;
            counter.textContent = `Money: ${count}`;
            updateUpgradeButton(upgrade1Btn, cost1, 1);
            updateUpgradeButton(upgrade2Btn, cost2, 2);
            updateUpgradeButton(upgrade3Btn, cost3, 3);
            updateUpgradeButton(upgrade4Btn, cost4, 4);
            updateUpgradeButton(upgrade5Btn, cost5, 5);
            updateResearchButton(research1Btn, 500, research1Max, research1Count);
            if (research1Count >= research1Max) {
                research1Btn.disabled = true;
            }
        }
    });

    research2Btn.addEventListener('click', () => {
        if (count >= 1000 && research2Count < research2Max) {
            count -= 1000;
            multi += 0.5; // Increase the multiplier
            research2Count += 1;
            counter.textContent = `Money: ${count}`;
            updateResearchButton(research2Btn, 1000, research2Max, research2Count);
            if (research2Count >= research2Max) {
                research2Btn.disabled = true;
            }
        }
    });

    // Menu button event listeners
    upgradesBtn.addEventListener('click', () => {
        upgMenu.style.display = upgMenu.style.display === 'block' ? 'none' : 'block';
        resMenu.style.display = 'none';
        setMenu.style.display = 'none';
    });

    researchBtn.addEventListener('click', () => {
        resMenu.style.display = resMenu.style.display === 'block' ? 'none' : 'block';
        upgMenu.style.display = 'none';
        setMenu.style.display = 'none';
    });

    settingsBtn.addEventListener('click', () => {
        setMenu.style.display = setMenu.style.display === 'block' ? 'none' : 'block';
        upgMenu.style.display = 'none';
        resMenu.style.display = 'none';
    });

    // Initialize menus: hide all and show only the upgrades menu
    upgMenu.style.display = 'none';
    resMenu.style.display = 'none';
    setMenu.style.display = 'none';

    // Initial updates to set the correct button text
    updateUpgradeButton(upgrade1Btn, cost1, 1);
    updateUpgradeButton(upgrade2Btn, cost2, 5);
    updateUpgradeButton(upgrade3Btn, cost3, 10);
    updateUpgradeButton(upgrade4Btn, cost4, 20);
    updateUpgradeButton(upgrade5Btn, cost5, 50);
    updateResearchButton(research1Btn, 500, research1Max, research1Count);
    updateResearchButton(research2Btn, 1000, research2Max, research2Count);
});

function handleResearchUpgrade3() {
    if (count >= 50000 && research3Count < research3Max) {
        count -= 50000;
        research3Count++;
        counter.textContent = `Money: ${count}`;
        updateResearchButton(research3Btn, 50000, research3Max, research3Count);
        unlockPassiveUpgrades();  // Unlock passive income upgrades
    }
}