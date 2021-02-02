export type EvaluationFunction = (
  textSolution: string
) => { score: number; validSolution: boolean };
