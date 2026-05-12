const MOCK_QUESTIONS_DB = {
  JavaScript: [
    {
      id: 1,
      question: "What is the output of: console.log([] + {} + false + !true)?",
      code_snippet: null,
      options: [
        { id: "A", text: "NaNfalse" },
        { id: "B", text: "[object Object]0" },
        { id: "C", text: "0[object Object]false" },
        { id: "D", text: "[object Object]falsefalse" },
      ],
      correct_answer: "D",
      explanation:
        "D is correct. [] coerces to empty string, {} coerces to '[object Object]', false stays false, !true is false. Concatenation gives '[object Object]falsefalse'.",
      difficulty: "Advanced",
      topic: "JavaScript",
      tags: ["type-coercion", "operators"],
    },
    {
      id: 2,
      question: "Which statement about Promise.allSettled() is true?",
      code_snippet: null,
      options: [
        { id: "A", text: "It rejects if any promise rejects" },
        { id: "B", text: "It returns immediately without waiting for promises" },
        { id: "C", text: "It waits for all promises and returns {status, value/reason}" },
        { id: "D", text: "It returns an array of values only" },
      ],
      correct_answer: "C",
      explanation:
        "C is correct. Promise.allSettled() waits for all promises to settle (resolve or reject) and returns an array of objects with {status, value} or {status, reason}.",
      difficulty: "Intermediate",
      topic: "JavaScript",
      tags: ["promises", "async"],
    },
    {
      id: 3,
      question: "What does the spread operator (...) do when used in object literals?",
      code_snippet: null,
      options: [
        { id: "A", text: "Creates a shallow copy of properties" },
        { id: "B", text: "Converts objects to arrays" },
        { id: "C", text: "Removes duplicate properties" },
        { id: "D", text: "Freezes the object" },
      ],
      correct_answer: "A",
      explanation:
        "A is correct. The spread operator in object literals creates a shallow copy of all enumerable properties.",
      difficulty: "Intermediate",
      topic: "JavaScript",
      tags: ["spread-operator", "objects"],
    },
    {
      id: 4,
      question: "What is the difference between let, const, and var in JavaScript?",
      code_snippet: null,
      options: [
        { id: "A", text: "Only var has hoisting" },
        { id: "B", text: "const is immutable, let/var are block-scoped differently" },
        { id: "C", text: "var is function-scoped, let/const are block-scoped" },
        { id: "D", text: "All three are equivalent" },
      ],
      correct_answer: "C",
      explanation:
        "C is correct. var is function-scoped, while let and const are block-scoped. const prevents reassignment but doesn't make objects immutable.",
      difficulty: "Beginner",
      topic: "JavaScript",
      tags: ["scoping", "variables"],
    },
    {
      id: 5,
      question: "What is event delegation in JavaScript?",
      code_snippet: null,
      options: [
        { id: "A", text: "Assigning events to parent elements to handle child events" },
        { id: "B", text: "Preventing events from bubbling up the DOM" },
        { id: "C", text: "Creating custom event objects" },
        { id: "D", text: "Synchronizing events between multiple elements" },
      ],
      correct_answer: "A",
      explanation:
        "A is correct. Event delegation uses event bubbling to handle events on parent elements instead of attaching listeners to each child.",
      difficulty: "Intermediate",
      topic: "JavaScript",
      tags: ["events", "dom"],
    },
    {
      id: 6,
      question: "What is a closure in JavaScript?",
      code_snippet: null,
      options: [
        { id: "A", text: "A function that returns another function" },
        { id: "B", text: "A function that has access to variables from its outer scope" },
        { id: "C", text: "A way to close a connection or resource" },
        { id: "D", text: "A syntax for ending a function definition" },
      ],
      correct_answer: "B",
      explanation:
        "B is correct. A closure is a function that has access to variables from its outer lexical scope, even after the outer function has returned.",
      difficulty: "Intermediate",
      topic: "JavaScript",
      tags: ["closures", "scoping"],
    },
  ],
  React: [
    {
      id: 7,
      question: "What is the purpose of React.memo()?",
      code_snippet: null,
      options: [
        { id: "A", text: "To cache component state values" },
        { id: "B", text: "To memoize component output and skip re-render if props are same" },
        { id: "C", text: "To store results of expensive computations" },
        { id: "D", text: "To manage global application state" },
      ],
      correct_answer: "B",
      explanation:
        "B is correct. React.memo() is a higher-order component that memoizes the component, preventing re-renders if props haven't changed.",
      difficulty: "Intermediate",
      topic: "React",
      tags: ["performance", "memoization"],
    },
    {
      id: 8,
      question: "In React Hooks, when does the cleanup function of useEffect run?",
      code_snippet: null,
      options: [
        { id: "A", text: "Before the component mounts" },
        { id: "B", text: "After the component unmounts and before re-running effect" },
        { id: "C", text: "Only on component unmount" },
        { id: "D", text: "Every render cycle before the effect" },
      ],
      correct_answer: "B",
      explanation:
        "B is correct. The cleanup function runs after unmount and before re-running the effect (if dependency array changes), allowing cleanup of event listeners, timers, etc.",
      difficulty: "Intermediate",
      topic: "React",
      tags: ["hooks", "useEffect"],
    },
    {
      id: 9,
      question: "What is the difference between controlled and uncontrolled components?",
      code_snippet: null,
      options: [
        { id: "A", text: "Controlled components use refs, uncontrolled use state" },
        { id: "B", text: "Controlled components have their state managed by React, uncontrolled manage their own state" },
        { id: "C", text: "Uncontrolled components are functional, controlled are class-based" },
        { id: "D", text: "There is no difference" },
      ],
      correct_answer: "B",
      explanation:
        "B is correct. Controlled components have their form data controlled by React state, while uncontrolled components manage their own state internally using refs.",
      difficulty: "Intermediate",
      topic: "React",
      tags: ["forms", "state"],
    },
    {
      id: 10,
      question: "What does the key prop do in React lists?",
      code_snippet: null,
      options: [
        { id: "A", text: "It uniquely identifies items to optimize re-renders and maintain state" },
        { id: "B", text: "It sorts the list items automatically" },
        { id: "C", text: "It encrypts sensitive data in the list" },
        { id: "D", text: "It is required only for styling lists" },
      ],
      correct_answer: "A",
      explanation:
        "A is correct. The key prop helps React identify which items have changed, improving performance and maintaining component state across list changes.",
      difficulty: "Beginner",
      topic: "React",
      tags: ["lists", "keys"],
    },
    {
      id: 11,
      question: "What is the purpose of useContext hook?",
      code_snippet: null,
      options: [
        { id: "A", text: "To manage local component state" },
        { id: "B", text: "To access context values without prop drilling" },
        { id: "C", text: "To create HTTP contexts" },
        { id: "D", text: "To debug component rendering" },
      ],
      correct_answer: "B",
      explanation:
        "B is correct. useContext allows consuming context values without using the Consumer component or destructuring props through multiple levels.",
      difficulty: "Intermediate",
      topic: "React",
      tags: ["hooks", "context"],
    },
  ],
  TypeScript: [
    {
      id: 12,
      question: "What is a discriminated union in TypeScript?",
      code_snippet: null,
      options: [
        { id: "A", text: "A union type without type guards" },
        { id: "B", text: "A union with a common literal property for type narrowing" },
        { id: "C", text: "A union that only accepts primitive types" },
        { id: "D", text: "A union of interfaces only, not types" },
      ],
      correct_answer: "B",
      explanation:
        "B is correct. A discriminated union has a common property (discriminator) with different literal values that TypeScript uses for type narrowing.",
      difficulty: "Advanced",
      topic: "TypeScript",
      tags: ["unions", "type-narrowing"],
    },
    {
      id: 13,
      question: "What is a generic in TypeScript?",
      code_snippet: null,
      options: [
        { id: "A", text: "A way to create reusable components with multiple types" },
        { id: "B", text: "A method to import types from external libraries" },
        { id: "C", text: "A way to create private properties" },
        { id: "D", text: "A type that always accepts any value" },
      ],
      correct_answer: "A",
      explanation:
        "A is correct. Generics allow creating reusable components, functions, and interfaces that work with multiple types while maintaining type safety.",
      difficulty: "Intermediate",
      topic: "TypeScript",
      tags: ["generics", "types"],
    },
    {
      id: 14,
      question: "What is the difference between interface and type in TypeScript?",
      code_snippet: null,
      options: [
        { id: "A", text: "Interfaces are for objects, types are for primitives" },
        { id: "B", text: "Interfaces can be extended, types cannot" },
        { id: "C", text: "Types are more flexible; interfaces have declaration merging and other features" },
        { id: "D", text: "There is no practical difference" },
      ],
      correct_answer: "C",
      explanation:
        "C is correct. While both define object shapes, interfaces support declaration merging and are more optimized for object types, while types are more flexible for unions and complex types.",
      difficulty: "Intermediate",
      topic: "TypeScript",
      tags: ["interfaces", "types"],
    },
    {
      id: 15,
      question: "What is the 'any' type in TypeScript and why should you avoid it?",
      code_snippet: null,
      options: [
        { id: "A", text: "'any' allows any value but disables type checking completely" },
        { id: "B", text: "'any' is only used for external libraries" },
        { id: "C", text: "'any' is the same as 'unknown'" },
        { id: "D", text: "'any' has no effect on type checking" },
      ],
      correct_answer: "A",
      explanation:
        "A is correct. 'any' disables type checking for a variable, which defeats the purpose of using TypeScript. 'unknown' should be preferred as it requires type checking before use.",
      difficulty: "Beginner",
      topic: "TypeScript",
      tags: ["types", "any"],
    },
  ],
  "System Design": [
    {
      id: 16,
      question: "Which database is best suited for storing time-series data at scale?",
      code_snippet: null,
      options: [
        { id: "A", text: "MySQL" },
        { id: "B", text: "MongoDB" },
        { id: "C", text: "InfluxDB or TimescaleDB" },
        { id: "D", text: "Redis" },
      ],
      correct_answer: "C",
      explanation:
        "C is correct. InfluxDB and TimescaleDB are purpose-built for time-series data with compression, retention policies, and optimized queries.",
      difficulty: "Advanced",
      topic: "System Design",
      tags: ["databases", "time-series"],
    },
    {
      id: 17,
      question: "What is horizontal scaling vs vertical scaling?",
      code_snippet: null,
      options: [
        { id: "A", text: "Horizontal adds more servers, vertical adds more resources to one server" },
        { id: "B", text: "They are the same thing" },
        { id: "C", text: "Vertical is always better than horizontal" },
        { id: "D", text: "Horizontal is only for databases" },
      ],
      correct_answer: "A",
      explanation:
        "A is correct. Horizontal scaling adds more machines to distribute load, while vertical scaling adds more CPU/RAM/storage to existing machines.",
      difficulty: "Intermediate",
      topic: "System Design",
      tags: ["scaling", "architecture"],
    },
    {
      id: 18,
      question: "What is the CAP theorem?",
      code_snippet: null,
      options: [
        { id: "A", text: "A database can have Consistency, Availability, and Partition tolerance simultaneously" },
        { id: "B", text: "A distributed system can guarantee at most 2 of 3: Consistency, Availability, Partition tolerance" },
        { id: "C", text: "It describes capital allocation in system design" },
        { id: "D", text: "It is a deprecated theory no longer relevant" },
      ],
      correct_answer: "B",
      explanation:
        "B is correct. The CAP theorem states that distributed systems can provide at most two of three guarantees: Consistency, Availability, and Partition tolerance.",
      difficulty: "Advanced",
      topic: "System Design",
      tags: ["distributed-systems", "cap-theorem"],
    },
    {
      id: 19,
      question: "What is a microservices architecture?",
      code_snippet: null,
      options: [
        { id: "A", text: "A single large application broken into small loosely coupled services" },
        { id: "B", text: "A way to reduce the number of servers needed" },
        { id: "C", text: "A database architecture pattern" },
        { id: "D", text: "A deprecated pattern no longer used" },
      ],
      correct_answer: "A",
      explanation:
        "A is correct. Microservices architecture breaks down a large application into small, independent services that can be developed and deployed separately.",
      difficulty: "Intermediate",
      topic: "System Design",
      tags: ["architecture", "microservices"],
    },
  ],
  Algorithms: [
    {
      id: 20,
      question: "What is the time complexity of finding an element in a balanced BST?",
      code_snippet: null,
      options: [
        { id: "A", text: "O(n)" },
        { id: "B", text: "O(log n)" },
        { id: "C", text: "O(n log n)" },
        { id: "D", text: "O(1)" },
      ],
      correct_answer: "B",
      explanation:
        "B is correct. In a balanced BST, each comparison eliminates half the remaining nodes, giving O(log n) time complexity.",
      difficulty: "Beginner",
      topic: "Algorithms",
      tags: ["bst", "search"],
    },
    {
      id: 21,
      question: "What is quicksort's average time complexity?",
      code_snippet: null,
      options: [
        { id: "A", text: "O(n)" },
        { id: "B", text: "O(log n)" },
        { id: "C", text: "O(n log n)" },
        { id: "D", text: "O(n²)" },
      ],
      correct_answer: "C",
      explanation:
        "C is correct. Quicksort has an average time complexity of O(n log n), though worst-case is O(n²) when the pivot is always the largest/smallest.",
      difficulty: "Intermediate",
      topic: "Algorithms",
      tags: ["sorting", "quicksort"],
    },
    {
      id: 22,
      question: "What is a hash table collision and how is it resolved?",
      code_snippet: null,
      options: [
        { id: "A", text: "When two keys hash to different values" },
        { id: "B", text: "When two keys hash to the same index; resolved by chaining or open addressing" },
        { id: "C", text: "A network issue between servers" },
        { id: "D", text: "An error in the hashing algorithm" },
      ],
      correct_answer: "B",
      explanation:
        "B is correct. Collisions occur when different keys hash to the same index and are resolved via chaining (linked lists) or open addressing (probing).",
      difficulty: "Intermediate",
      topic: "Algorithms",
      tags: ["hash-tables", "collisions"],
    },
    {
      id: 23,
      question: "What is dynamic programming?",
      code_snippet: null,
      options: [
        { id: "A", text: "Writing code that changes behavior at runtime" },
        { id: "B", text: "Breaking problems into subproblems and storing results to avoid recomputation" },
        { id: "C", text: "Using dynamic types in programming languages" },
        { id: "D", text: "A way to manage memory automatically" },
      ],
      correct_answer: "B",
      explanation:
        "B is correct. Dynamic programming solves complex problems by breaking them into overlapping subproblems and memoizing results to avoid redundant computation.",
      difficulty: "Advanced",
      topic: "Algorithms",
      tags: ["dynamic-programming", "optimization"],
    },
    {
      id: 24,
      question: "What is a greedy algorithm?",
      code_snippet: null,
      options: [
        { id: "A", text: "An algorithm that always makes the locally optimal choice" },
        { id: "B", text: "An algorithm that uses excessive memory" },
        { id: "C", text: "An algorithm that guarantees the global optimum always" },
        { id: "D", text: "An algorithm that is slow but accurate" },
      ],
      correct_answer: "A",
      explanation:
        "A is correct. Greedy algorithms make locally optimal choices at each step, hoping to find a global optimum. They work for some problems (Dijkstra, Kruskal) but not all.",
      difficulty: "Intermediate",
      topic: "Algorithms",
      tags: ["greedy", "optimization"],
    },
  ],
};

export function generateMockQuestions(topics, years, numQuestions) {
  const allQuestions = [];

  // Collect all questions from requested topics
  topics.forEach((topic) => {
    const topicQuestions = MOCK_QUESTIONS_DB[topic] || MOCK_QUESTIONS_DB.JavaScript;
    allQuestions.push(...topicQuestions);
  });

  // If not enough questions, repeat and shuffle to get more
  while (allQuestions.length < numQuestions) {
    topics.forEach((topic) => {
      const topicQuestions = MOCK_QUESTIONS_DB[topic] || MOCK_QUESTIONS_DB.JavaScript;
      allQuestions.push(...topicQuestions);
      if (allQuestions.length >= numQuestions) return;
    });
  }

  // Shuffle all questions
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);

  // Return exactly the requested number of questions
  const selected = shuffled.slice(0, numQuestions).map((q, idx) => ({
    ...q,
    id: idx + 1,
    difficulty: getDifficultyByYears(years),
  }));

  if (selected.length !== numQuestions) {
    console.warn(`Warning: Generated ${selected.length} questions instead of requested ${numQuestions}`);
  }

  return selected;
}

function getDifficultyByYears(years) {
  if (years <= 1) return "Beginner";
  if (years <= 3) return "Intermediate";
  if (years <= 6) return "Advanced";
  return "Expert";
}
