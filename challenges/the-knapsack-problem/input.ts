import { GetInputFunction } from '../types';
import instance from './instance.json';


const getInput: GetInputFunction = () => {
  let inputString = "";
  
  inputString += `${instance.knapsackSize}\n`;
  inputString += `${instance.items.length}\n`;
  inputString += instance.items.map(item => `${item.size} ${item.value}`).join('\n');

  return inputString;
}

export default getInput;