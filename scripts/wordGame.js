const wordSets = [
    { letters: [['C', 'A', 'T'], ['D', 'O', 'G'], ['F', 'O', 'X']], words: ["CAT", "DOG", "FOX"] },
    { letters: [['B', 'E', 'E'], ['A', 'N', 'T'], ['O', 'W', 'L']], words: ["BEE", "ANT", "OWL"] },
    { letters: [['S', 'U', 'N'], ['M', 'O', 'O', 'N'], ['S', 'T', 'A', 'R']], words: ["SUN", "MOON", "STAR"] },
    { letters: [['T', 'R', 'E', 'E'], ['L', 'E', 'A', 'F']], words: ["TREE", "LEAF"] }
];

let currentSetIndex = 0;
let selectedLetters = "";
let selectedCells = [];
let usedCells = new Set();
let foundWords = new Set();

const gameBoard = document.getElementById('game-board');

function initializeGame() {
    gameBoard.innerHTML = "";
    usedCells.clear();
    foundWords.clear();
    selectedLetters = "";
    selectedCells = [];

    if (currentSetIndex >= wordSets.length) {
        currentSetIndex = 0;
        increaseGridSize();
    }

    const currentSet = wordSets[currentSetIndex];
    const letters = currentSet.letters;
    const words = currentSet.words;

    gameBoard.style.display = 'grid';
    gameBoard.style.gridTemplateColumns = `repeat(${letters[0].length}, 50px)`;
    gameBoard.style.gap = '10px';
    gameBoard.style.justifyContent = 'center';
    gameBoard.style.alignItems = 'center';
    gameBoard.style.marginTop = '20px';

    let allCells = [];
    letters.forEach((row, rowIndex) => {
        row.forEach((letter, colIndex) => {
            const cell = document.createElement('div');
            cell.textContent = letter;
            cell.classList.add('letter-cell');
            cell.style.fontSize = '24px';
            cell.style.fontFamily = 'serif';
            cell.style.color = '#5f8b8b';
            cell.style.textAlign = 'center';
            cell.style.width = '50px';
            cell.style.height = '50px';
            cell.style.display = 'flex';
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
            cell.style.border = '0px solid #5f8b8b';
            cell.style.cursor = 'pointer';
            
            cell.dataset.row = rowIndex;
            cell.dataset.col = colIndex;

            cell.addEventListener('mouseenter', () => {
                if (usedCells.has(cell)) return;
                selectedLetters += letter;
                selectedCells.push(cell);
                cell.style.backgroundColor = '#b0d0d0';
                checkWord(words, allCells);
            });

            allCells.push(cell);
            gameBoard.appendChild(cell);
        });
    });
}

gameBoard.addEventListener('mouseleave', () => {
    selectedLetters = "";
    resetSelection();
});

function resetSelection() {
    selectedCells.forEach(cell => {
        if (!usedCells.has(cell)) {
            cell.style.backgroundColor = 'transparent';
        }
    });
    selectedCells = [];
}

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function checkWord(words, allCells) {
    if (words.includes(selectedLetters) && !foundWords.has(selectedLetters)) {
        foundWords.add(selectedLetters);
        const randomColor = getRandomColor();
        selectedCells.forEach(cell => {
            cell.style.backgroundColor = randomColor;
            usedCells.add(cell);
        });
        selectedLetters = "";
        selectedCells = [];
        
        if ([...foundWords].length === words.length) {
            setTimeout(() => {
                currentSetIndex++;
                initializeGame();
            }, 1000);
        }
    }
} 

function increaseGridSize() {
    wordSets.push({ letters: generateRandomGrid(4), words: generateWordsForGrid(4) });
    wordSets.push({ letters: generateRandomGrid(8), words: generateWordsForGrid(8) });
}

function generateRandomGrid(size) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: size }, () => Array.from({ length: size }, () => letters[Math.floor(Math.random() * letters.length)]));
}

function generateWordsForGrid(size) {
    return ["RANDOM", "WORDS", "TO", "FIND"]; // Заменить на логику генерации подходящих слов
}

initializeGame();
