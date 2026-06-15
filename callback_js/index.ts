// index.ts
interface Person {
  name: string;
  score: number;
}

function greet(person: Person): void {
  console.log(`Hello, ${person.name}! You scored ${person.score} points.`);
}

const wayne: Person = { name: "Wayne", score: 100 };
greet(wayne); // Hello, Wayne! You scored 100 points.
