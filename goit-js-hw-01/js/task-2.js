const search = document.querySelector(".search");
const size = document.querySelector(".N");

function minStepsToReachTarget(knightPos, targetPos, N) {
  // Можливі ходи коня
  const directions = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  // Перевірка, чи знаходиться позиція в межах шахівниці
  function isValid(x, y) {
    return x >= 1 && x <= N && y >= 1 && y <= N;
  }

  // Створюємо чергу для BFS
  const queue = [];
  queue.push([knightPos[0], knightPos[1], 0]); // [x, y, кроки]

  // Масив для відстеження відвіданих клітинок
  const visited = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));
  visited[knightPos[0]][knightPos[1]] = true;

  // Виконуємо BFS
  while (queue.length > 0) {
    const [x, y, steps] = queue.shift();

    // Якщо поточна позиція — це цільова, повертаємо кількість кроків
    if (x === targetPos[0] && y === targetPos[1]) {
      return steps;
    }

    // Перебираємо всі можливі ходи коня
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (isValid(nx, ny) && !visited[nx][ny]) {
        visited[nx][ny] = true;
        queue.push([nx, ny, steps + 1]);
      }
    }
  }

  // Якщо ціль недосяжна (теоретично), повертаємо -1
  return -1;
}

// Приклад виклику функції

const N = 6;
const knightPos = [6, 3];
const targetPos = [1, 5];

search.addEventListener("click", () => {
  console.log(
    "Мінімальна кількість ходів:",
    minStepsToReachTarget(knightPos, targetPos, N)
  );
});
