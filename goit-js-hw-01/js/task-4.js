class Graph {
  constructor(vertices) {
    this.vertices = vertices; // Кількість вершин
    this.adjMatrix = Array.from({ length: vertices }, () =>
      Array(vertices).fill(0)
    ); // Матриця суміжності
  }

  // Додати ребро
  addEdge(u, v, weight = 1) {
    this.adjMatrix[u][v] += weight;
    this.adjMatrix[v][u] += weight; // Граф неорієнтований
  }

  // Перевірка парності ступенів вершин
  getOddDegreeVertices() {
    const oddVertices = [];
    for (let i = 0; i < this.vertices; i++) {
      const degree = this.adjMatrix[i].reduce((sum, weight) => sum + weight, 0);
      if (degree % 2 !== 0) oddVertices.push(i);
    }
    return oddVertices;
  }

  // Пошук найкоротшого шляху між двома вершинами (алгоритм Дейкстри)
  dijkstra(start, end) {
    const distances = Array(this.vertices).fill(Infinity);
    const visited = Array(this.vertices).fill(false);
    const previous = Array(this.vertices).fill(null);
    distances[start] = 0;

    for (let i = 0; i < this.vertices; i++) {
      let u = -1;

      // Знайти невідвідану вершину з найменшою відстанню
      for (let j = 0; j < this.vertices; j++) {
        if (!visited[j] && (u === -1 || distances[j] < distances[u])) u = j;
      }

      if (distances[u] === Infinity) break;
      visited[u] = true;

      // Оновити відстані до суміжних вершин
      for (let v = 0; v < this.vertices; v++) {
        if (this.adjMatrix[u][v] > 0 && !visited[v]) {
          const newDist = distances[u] + this.adjMatrix[u][v];
          if (newDist < distances[v]) {
            distances[v] = newDist;
            previous[v] = u;
          }
        }
      }
    }

    // Відновити шлях
    const path = [];
    for (let at = end; at !== null; at = previous[at]) path.push(at);
    path.reverse();

    return { distance: distances[end], path };
  }

  // Додати найкоротші шляхи між непарними вершинами
  addShortestPathsForOddVertices() {
    const oddVertices = this.getOddDegreeVertices();
    const pairs = [];

    // Знаходимо всі пари непарних вершин
    for (let i = 0; i < oddVertices.length; i++) {
      for (let j = i + 1; j < oddVertices.length; j++) {
        const { distance } = this.dijkstra(oddVertices[i], oddVertices[j]);
        pairs.push({ u: oddVertices[i], v: oddVertices[j], distance });
      }
    }

    // Використовуємо алгоритм мінімального парування (жадібний підхід)
    pairs.sort((a, b) => a.distance - b.distance);
    const used = Array(this.vertices).fill(false);

    for (const { u, v, distance } of pairs) {
      if (!used[u] && !used[v]) {
        this.addEdge(u, v, distance);
        used[u] = used[v] = true;
      }
    }
  }

  // Обхід графа
  eulerianCircuit(start) {
    const stack = [start];
    const circuit = [];
    const tempMatrix = this.adjMatrix.map((row) => row.slice());

    while (stack.length > 0) {
      const u = stack[stack.length - 1];
      let hasEdge = false;

      for (let v = 0; v < this.vertices; v++) {
        if (tempMatrix[u][v] > 0) {
          stack.push(v);
          tempMatrix[u][v]--;
          tempMatrix[v][u]--;
          hasEdge = true;
          break;
        }
      }

      if (!hasEdge) {
        circuit.push(stack.pop());
      }
    }

    return circuit.reverse();
  }

  // Основна функція для пошуку китайського листоношного маршруту
  findChinesePostmanPath(start = 0) {
    this.addShortestPathsForOddVertices(); // Додати шляхи для непарних вершин
    return this.eulerianCircuit(start); // Знайти Ейлерів цикл
  }
}

// Приклад використання
const graph = new Graph(5);
graph.addEdge(0, 1, 1);
graph.addEdge(1, 2, 1);
graph.addEdge(2, 3, 1);
graph.addEdge(3, 4, 1);
graph.addEdge(4, 0, 1);
graph.addEdge(1, 3, 1);

const path = graph.findChinesePostmanPath(0);
console.log("Найкоротший маршрут:", path);

