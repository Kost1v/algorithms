const btnAdd = document.querySelector(".addValue");
const linkedList = document.querySelector(".viewList");
const btnSize = document.querySelector(".size");
const btnDuplicates = document.querySelector(".duplicates");
const btnSorted = document.querySelector(".sorted");
const inputAdd = document.querySelector(".inputAdd");
/* -------------------------------------------------------------------------------------------- */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Клас для лінкед ліста
class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    const newNode = new Node(value); // створюю новий вузол

    if (this.head === null) {
      // Якщо список порожній, новий вузол стає головою
      this.head = newNode;
    } else {
      // Якщо список не порожній, знаходимо останній вузол
      let current = this.head;
      while (current.next !== null) {
        current = current.next; // переходимо до наступного вузла
      }
      current.next = newNode; // додаємо новий вузол після останнього
    }
  }

  // Метод для виведення всіх елементів списку
  printList() {
    let current = this.head; // починаємо з голови списку
    while (current !== null) {
      console.log(current.value);
      current = current.next;
    }
  }

  getSize() {
    let count = 0;
    let current = this.head;
    while (current !== null) {
      count++;
      current = current.next;
    }
    return count;
  }

  
  removeDuplicates() {
    let current = this.head;
    
    while (current !== null && current.next !== null) {
      let runner = current;
      // Порівнюємо поточний вузол з усіма наступними
      while (runner.next !== null) {
        if (runner.next.value === current.value) {
          // Якщо знайдено дубль, пропускаємо його, змінюючи посилання
          runner.next = runner.next.next;
        } else {
          runner = runner.next; // переходимо до наступного вузла
        }
      }
      current = current.next; // переходимо до наступного вузла для порівняння
    }
  }

  // TASK-2

  sortByFrequency() {
    if (this.head === null) return;
    // Створив словник частоти
    const frequencyMap = new Map();
    let current = this.head;

    // Заповнив словник частоти
    while (current !== null) {
      frequencyMap.set(
        current.value,
        (frequencyMap.get(current.value) || 0) + 1
      );
      current = current.next;
    }
    // Зберіг елементи в масив для сортування
    const elements = [];
    current = this.head;

    while (current !== null) {
      elements.push(current);
      current = current.next;
    }
    // Сортування елементів за частотою, а при однаковій частоті - збереження початкового порядку
    elements.sort((a, b) => {
      const freqA = frequencyMap.get(a.value);
      const freqB = frequencyMap.get(b.value);

      if (freqA === freqB) {
        return 0; // залишаємо порядок, як був
      }
      return freqB - freqA; // сортуємо за спаданням частоти
    });

    //Відновлення лінкед ліста після сортування
    this.head = elements[0];
    current = this.head;

    for (let i = 1; i < elements.length; i++) {
      current.next = elements[i];
      current = current.next;
    }
    current.next = null; // закінчуємо лінкед ліст
  }
}

// Створення об'єкта лінкед ліста
const list = new LinkedList();

list.add(2);
list.add(1);
list.add(2);
list.add(1);
list.add(3);
list.add(2);
list.add(1);
list.add(5);
list.add(1);
list.add(5);

const addValueInList = (e) => {
  list.add(+inputAdd.value);
  inputAdd.value = "";
};

const viewList = (e) => {
  list.printList();
  console.log(list);
};

btnAdd.addEventListener("click", addValueInList);

linkedList.addEventListener("click", viewList);

btnSize.addEventListener("click", () =>
  console.log("Розмір списку:", list.getSize())
);
btnDuplicates.addEventListener("click", () => {
  list.removeDuplicates();
  console.log(list);
});

// TASK-2

btnSorted.addEventListener("click", () => {
  list.sortByFrequency();
});
