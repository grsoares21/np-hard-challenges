import { EvaluationFunction } from "../types";
import kanpsackInstance from "../the-knapsack-problem/instance.json";

const evaluateKnapsackProblem: EvaluationFunction = (textSolution: string) => {
  const solution = textSolution.split("\n");

  let totalScore = 0;
  let currentSize = 0;

  for (let i = 0; i < solution.length; i++) {
    const { value, size } = kanpsackInstance.items[+solution[i]];

    currentSize += size;
    totalScore += value;

    if (currentSize > kanpsackInstance.knapsackSize) {
      return {
        score: 0,
        validSolution: false,
      };
    }
  }

  return {
    score: 99999,
    validSolution: true,
  };
};

export default evaluateKnapsackProblem;
