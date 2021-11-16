# Trapping Rain Water

**Question:** Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

```
Example
Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
```

**Solution:** You start with a left pointer and a right pointer on both side, only move toward the center with the smaller height pointer because the smaller number decided how many units on water will be trapped. You compare the smaller number with the local max, use the bigger number to subtract the height at that position.

```
const computeWaterTrap = (array) => {
    let left = 0;
    let right = array.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let res = 0;

    while (left < right) {
        if (array[left] < array[right]) {
            leftMax = Math.max(leftMax, array[left]);
            res = res + (leftMax - array[left]);
            left++;
        } else {
            rightMax = Math.max(rightMax, array[right]);
            res = res + (rightMax - array[right]);
            right--;
        }
    }

    return res;
}
```

**Solution with graphics:**
```
const computeWaterTrap = (array) => {
    let arr = [...array];
    arr = arr.map(element => parseInt(element));
    const max = [...arr].sort((a, b) => b - a)[0];
    let newArr = [];

    for (let i = max; i > 0; i--) {
        let row = [];
        let isUnit = false;
        let first = false;
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] >= i) {
                if (first && isUnit) {
                    row.push('c');
                    row = row.map(n => (n === 0) ? n = 'f' : n = n);
                    isUnit = false;
                } else {
                    row.push('c');
                    first = true;
                }
            } else {
                if (!first) {
                    row.push('b');
                } else {
                    row.push(0)
                }
                isUnit = true
            }
        }
        newArr.push(row);
    }
    return {
        'histogram': newArr,
        'width': array.length,
        'height': max,
        'units': unitsCounter(newArr)
    };
}

// Count the units in a histogram
const unitsCounter = (array) => {
    let counter = 0;

    for (const i in array) {
        for (const j in array[i]) {
            if (array[i][j] === 'f') {
                counter++;
            }
        }
    }

    return counter;
}
```