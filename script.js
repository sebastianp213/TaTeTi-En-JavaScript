const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');
let board = Array(9).fill(null);
let turno = "X";
let fin = false;



function crearTablero() {
    boardEl.innerHTML = '';
    board.forEach((_, i) => {
        const cell = document.createElement('div');
        cell.className = "cell";
        cell.addEventListener("click", () => jugar(i));
        boardEl.appendChild(cell);
});
}


function jugar(i) {
    if(board[i] || fin) return;
    board[i] = turno;
    boardEl.children[i].textContent = turno;
    if(verificarGanador()){
        statusEl.textContent = `Jugador ${turno} gano!`;
        fin = true;
        return;
    }
    if(board.every(c => c)){
        statusEl.textContent = "Empate!";
        fin = true;
        return;

    }
turno = turno === "X" ? "O" : "X";
statusEl.textContent = `Turno del jugador ${turno}`;    
}

function verificarGanador() {
    const lineas = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return lineas.some(([a,b,c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
}

function reiniciarPartida(){
    board = Array(9).fill(null);
    turno = "X";
    fin = false;
    statusEl.textContent = "Turno de X";
    crearTablero();
}

resetBtn.addEventListener("click", reiniciarPartida);
crearTablero();

