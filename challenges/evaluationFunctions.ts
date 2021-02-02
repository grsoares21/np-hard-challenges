import lalalaProblemEvaluationFunction from "./lalala-problem/evaluationFunction";
import theKnapsackProblemEvaluationFunction from "./the-knapsack-problem/evaluationFunction";
import theTravellingThiefProblemEvaluationFunction from "./the-travelling-thief-problem/evaluationFunction";
import { EvaluationFunction } from "./types";

const evaluationFunctions: { [problem: string]: EvaluationFunction } = {
  "the-knapsack-problem": theKnapsackProblemEvaluationFunction,
  "lalala-problem": lalalaProblemEvaluationFunction,
  "the-travelling-thief-problem": theTravellingThiefProblemEvaluationFunction,
};

export default evaluationFunctions;
