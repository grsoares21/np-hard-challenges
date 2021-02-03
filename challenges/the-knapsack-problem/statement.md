---
name: "The Knapsack Problem"
description: "Given a set of items with a weight and a value and given a knapsack with a maximum capacity, determine
which items to include in the knapsack in order to maximise the total value inside it."
imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Knapsack.svg/1280px-Knapsack.svg.png"
---

The Knapsack Problem is one of the most classical NP-Hard optimization problems. It's concepts is fairly simple to understand.
You have a Knapsack that can carry a limited number of items, defined by it's _capacity_ measured in kilograms.

You also have a list of items that you can choose to put inside the knapsack or not. Each item in the list has a weight and a value.

Your objective is to select a set items that fit inside the knapsack and to maximise the total value inside it.

## Input

The input of your code corresponds to an instance of the Knapsack Problem: a list of items with their corresponding weights and values as well as the capacity of the knapsack.

The format of the input file is as follows:
**First line**: the capacity of the knapsack
**Second line**: _n_ corresponding to the number of possible items to select from
**Next _n_ lines**: _w_ and _v_ values separated by a whitespace corresponding to the weight and value respectively of each item

### Example of input
```python
1400 #a knapsack thhat can carry up to 1400 kg, yeah, for real
5 #there will be 5 items to choose from
400 400 #item 0: weights 400 kg and is worth 400
1000 800 #item 1: weights 1000 kg and is worth 800
900 750 #item 2: weights 900 kg and is worth 750
550 600 #item 3: weights 550 kg and is worth 600
1100 1150 #item 4: weights 1100 kg and is worth 1150
```

## Solution

The solution is the list of items to be put in the knapsack. The file to be uploaded is a .txt file with the index of each item in the original list (starting in 0) separated by a new line.

### Example of solution

```python
0 #select item 0 to put in the knapsack
1 #select item 1 to put in the knapsack
```

## Validity

A solution is valid if and only if:

- There are no repeated items on the list
- The index of all selected items correspond correctly to items in the original list
- The sum of weights of the original items is less or equal to the capacity of the knapsack

## Score

The score of a solution is the sum of values of all selected items. In the example solution above, the total score is **1200**.
