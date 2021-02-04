import { GetInputFunction } from "./types";

import knapsackInput from './the-knapsack-problem/input';

const challengeInputs: { [challengeId: string]: GetInputFunction } = {
  "the-knapsack-problem": knapsackInput
}

export default challengeInputs;