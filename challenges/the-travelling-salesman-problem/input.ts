import { GetInputFunction } from "../types";
import instance from "./instance.json";

const getInput: GetInputFunction = () => {
  let inputString = "";

  inputString += `${instance.numberOfCities}\n`;
  inputString += instance.distances
    .map((item) => `${item.i} ${item.j} ${item.distance}`)
    .join("\n");

  return inputString;
};

export default getInput;
