// 1
// Write a function largestOdd(arr) that takes an array arr and returns the largest odd number in it. If there are no odd numbers, it should return a string "No odd numbers found".

// Input: arr = [2, 3, 4, 6, 7]
// Output: 7

function largestOdd(arr) {
    let largestOddNumber = 0;
    arr.forEach(element => {
        if (element % 2 && element > largestOddNumber) { largestOddNumber = element }
    });
    return (largestOddNumber == 0) ? "No odd numbers found" : largestOddNumber;
}

// 2
// Let s be a string that contains a sequence of decimal numbers separated by commas, e.g., s = '1.23,2.4,3.123'. Write a function sequenceSum(s) that prints the sum of the numbers in s.
// Input: s = '1.1, 2.1, 3.9'
// Output: 7.1

function sequenceSum(s) {
    return s.split(',').reduce((sum, current) => sum += +current, 0);
}

// 3
// Write a function vowelsNumber(s) that accepts string s as a parameter and counts up the number of vowels contained in the string. Valid vowels are: 'a', 'e', 'i', 'o', and 'u'.
// Input: s = 'azcbobobegghakl'
// Output: 5

// Input: s = 'AzcbobObEgghaKL'
// Output: 5

function vowelsNumber(s) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let counter = 0;
    for (let i = 0; i < s.length; i++) {
        if (vowels.includes(s[i].toLowerCase())) counter++;
    }
    return counter;
}

// console.log(vowelsNumber('AzcbobObEgghOOOlllaaEEyuioKL'));

// 4
// Write a function  contains(str1, str2) that accepts two strings str1 and str2 as arguments and returns a boolean True if either string occurs anywhere in the other, and False otherwise. Function should be case insensitive.
// Input: s1 = 'abcd', s2 = 'bc'
// Output: True

// Input: s1 = 'ABcd', s2 = 'bC'
// Output: True

function contains(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    if (str1.length >= str2.length) {
        return str1.includes(str2)
    } else { return str2.includes(str1) }
}


// console.log(contains('bCD', 'ABcd'));
// 5
// Write a function isPalindrome(s) that accepts string s as an argument and returns a boolean True if string reads the same way backwards and forwards. The function should be case and spaces insensitive.
// Input: s = ‘topot’
// Output: True

// Input: s = ‘TopOt’
// Output: True

// Input: s = ‘to pot’
// Output: True

// Input: s = ‘ropot’
// Output: False

function isPalindrome(s) {
    const startString = s.replace(/(\s)+/g, '').toLowerCase();
    const invertedString = startString.split('').reverse().join('');
    console.log(startString);
    console.log(invertedString);
    return startString == invertedString;
}


// 6
// Write a function findExtremeDivisors(n1, n2). n1 and n2 should be positive ints. The function should return a string “Error: n1 and n2 should be positive ints!” if either n1 or n2 <= 0.
// The function returns an array of two elements containing the smallest common divisor > 1 and the largest common divisor of n1 and n2.
// If the are no common divisors, the function should return a string "There are no common divisors".
// Input: n1 = 12, n2 = 6
// Output: [2, 6]

// Input: n1 = 21, n2 = 7
// Output: [7, 7]

function findExtremeDivisors(n1, n2) {
    if (n1 <= 0 || n2 <= 0) { return 'Error: n1 and n2 should be positive ints!' }
    const arr = [];
    const smalestNumber = (n1 >= n2) ? n2 : n1;
    console.log(smalestNumber)
    for (let i = 2; i <= smalestNumber; i++) {
        if (n1 % i == 0 && n2 % i == 0) arr.push(i);
    }
    if (arr.length > 2) arr.splice(1, arr.length - 2)

    return arr;
}


// 7
// Write a function intersect(L1, L2). L1 and L2 are arrays. The function returns an array that is the intersection of L1 and L2.
// Input: L1 = [1, 2, 'a', 'c'], L2 = [1, 'b', 'c', 'd', 'e', 2]
// Output: [1, 2, 'c']

function intersect(L1, L2) {
    const arr = [];
    const largestArray = (L1.length >= L2.length) ? L1 : L2;
    const lessArray = (L1.length >= L2.length) ? L2 : L1;
    for (let i = 0; i < largestArray.length; i++) {
        if (lessArray.includes(largestArray[i])) arr.push(largestArray[i])
    }
    return arr;
}

// 8
// Write a method called indexOfMax(arr) that takes an array arr of integers and returns the index of the largest element.
// Input: arr = [1, 2, 3, 4, 1.2, 7, 1.4342, 2.222]
// Output: 5

function indexOfMax(arr) {
    const max = Math.max.apply(null, arr);
    return arr.indexOf(max);
}

// 9
// Write a method called letterHist(s) that takes a string s as a parameter and returns a string as a histogram of the letters in the string s. The zeroth element of the histogram should contain the number of a’s in the string (upper- and lowercase); the 25th element should contain the number of z’s. Your solution should only traverse the string once.

// Input: s = 'cabAccCCde'
// Output:
// a = 2
// b = 1
// c = 5
// d = 1
// e = 1
// f = 0
// g = 0
// ...
// z = 0

// 10
// Write a recursive method named isPalindrome(s) that takes a String s as a parameter and returns a boolean indicating whether the word is a palindrome. The function should be case and spaces insensitive.

// Input: s = ‘topot’
// Output: True

// Input: s = ‘to pot’
// Output: True

// Input: s = ‘TopOt’
// Output: True

// Input: s = ‘ropot’
// Output: False



// ONE TASK TO RULE THEM ALL
// Given a matrix, write a function clockwiseSpiral(matrix) that takes the matrix as an input and prints it in clockwise spiral form. See the following examples. 

// Examples:
// Input:
// [[1, 2, 3, 4],
// [5, 6, 7, 8],
// [9, 10, 11, 12],
// [13, 14, 15, 16]]

// Output:
// 1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10