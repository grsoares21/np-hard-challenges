---
name: "The Travelling Salesman Problem"
description: "Minimize the total distance traveled by the salesman while visiting all cities"
imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/GLPK_solution_of_a_travelling_salesman_problem.svg/1200px-GLPK_solution_of_a_travelling_salesman_problem.svg.png"
---

The Travelling Salesman Problem is one of the most classical NP-Hard optimization problems.

You have a list of cities that you need to visit. You need to visit all of them and comeback to your starting point in the end.

You also have a list of the distances between each city and every other city.

Find the best order in which to visit the cities in order to minimize the total traveled distance.

## Input

The input of your code corresponds to an instance of the Travelling Salesman Problem: a list of cities to visit as well as the distances between each city and every other city.

The format of the input file is as follows:

- **First line**: _n_ corresponding to the number of cities that you need to visit
  > _Note_: the cities are identified by their number (from 1 to _n_)
- **Next _(n²-n) / 2_ lines**: _x_ _y_ _z_ corresponding to the distance _z_ between the cities _x_ and _y_ measured in kilometers

### Example of input

```python
4 #you have 4 cities to visit
1 2 100 #the distance between cities 1 and 2 is 100 kilometers
1 3 220 #the distance between cities 1 and 3 is 220 kilometers
1 4 350 #the distance between cities 1 and 4 is 350 kilometers
2 3 200 #the distance between cities 2 and 3 is 200 kilometers
2 4 125 #the distance between cities 2 and 4 is 125 kilometers
3 4 175 #the distance between cities 3 and 4 is 175 kilometers
```

## Solution

The solution is the list of cities in the order they are meant to be visited, each city separated by a new line.

> _Note:_ in order to complete the cycle the last city should be equal to the first

### Example of solution

```python
4 #start at city number 4
3 #then visit city number 3
2 #then visit city number 2
1 #then visit city number 1
4 #then finish the path with city number 4
```

## Validity

A solution is valid if and only if:

- There are no repeated cities in the list except for the first and last which should be the same
- The number of all selected cities are above or equal to 1 and below or equal to _n_
- All the cities from 1 to _n_ are present in the final solution

## Score

The score of a solution is defined by the sum of all the distances between cities subtracted of the total traveled distance of the solution. In other words, the less the total traveled distance, the higher is the score. In the above the solution the score is equal to **1270** (the total of all the distances) subtracted of **825** (the total traveled distance), which is **445**.
