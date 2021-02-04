export type EvaluationFunction = (
  textSolution: string
) => { score: number; validSolution: boolean };


export type GetInputFunction = () => string;
