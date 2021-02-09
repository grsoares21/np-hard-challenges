import { EvaluationFunction } from "../types";
import instance from "./instance.json";

const evaluateTheTravellingSalesmanProlem: EvaluationFunction = (
  textSolution: string
) => {
  const solution = textSolution.split("\n").map((city) => parseInt(city));

  let totalTraveledDistance = 0;

  const firstCity = solution[0];
  const lastCity = solution[solution.length - 1];
  const distanceMatrix = [];

  if (firstCity != lastCity) {
    return {
      score: 0,
      validSolution: false,
    };
  }

  if (solution.length != instance.numberOfCities + 1) {
    return {
      score: 0,
      validSolution: false,
    };
  }

  const referenceDistance = instance.distances.reduce(
    (acc, distanceObject) => acc + distanceObject.distance,
    0
  );

  instance.distances.forEach(({ i, j, distance }) => {
    if (!distanceMatrix[i]) {
      distanceMatrix[i] = [];
    }
    if (!distanceMatrix[j]) {
      distanceMatrix[j] = [];
    }

    distanceMatrix[i][j] = distance;
    distanceMatrix[j][i] = distance;
  });

  const visitedCities = new Set();

  for (let i = 0; i < instance.numberOfCities; i++) {
    let currentCity = solution[i];
    let nextCity = solution[i + 1];

    if (
      visitedCities.has(currentCity) ||
      currentCity < 1 ||
      currentCity > instance.numberOfCities ||
      nextCity < 1 ||
      nextCity > instance.numberOfCities
    ) {
      return {
        score: 0,
        validSolution: false,
      };
    }

    visitedCities.add(currentCity);

    let currentDistance = distanceMatrix[currentCity][nextCity];
    totalTraveledDistance += currentDistance;
  }

  return {
    score: referenceDistance - totalTraveledDistance,
    validSolution: true,
  };
};

export default evaluateTheTravellingSalesmanProlem;
