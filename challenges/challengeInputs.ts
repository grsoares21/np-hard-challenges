import { GetInputFunction } from "./types";

import knapsackInput from "./the-knapsack-problem/input";
import travellingSalesmanInput from "./the-travelling-salesman-problem/input";

const challengeInputs: { [challengeId: string]: GetInputFunction } = {
  "the-knapsack-problem": knapsackInput,
  "the-travelling-salesman-problem": travellingSalesmanInput,
};

export default challengeInputs;
