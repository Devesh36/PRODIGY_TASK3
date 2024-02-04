document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("game-board");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    // Function to handle cell clicks
    function handleCellClick(event) {
        const index = event.target.dataset.index;

        // Check if the cell is empty and the game is still ongoing
        if (!gameBoard[index] && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            
            // Check for a winner after each move
            if (checkWinner()) {
                alert(`Player ${currentPlayer} wins!`);
            } else if (gameBoard.every(cell => cell !== "")) {
                alert("It's a draw!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    // Function to check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true; // We have a winner
            }
        }

        return false; // No winner yet
    }
});
