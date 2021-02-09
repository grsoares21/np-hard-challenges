import theTravellingSalesmanProblemEvaluationFunction from "./the-travelling-salesman-problem/evaluationFunction";
import theKnapsackProblemEvaluationFunction from "./the-knapsack-problem/evaluationFunction";
import { EvaluationFunction } from "./types";

const evaluationFunctions: { [problem: string]: EvaluationFunction } = {
  "the-knapsack-problem": theKnapsackProblemEvaluationFunction,
  "the-travelling-salesman-problem": theTravellingSalesmanProblemEvaluationFunction,
};

export default evaluationFunctions;
