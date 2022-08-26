function getPrimes(n) {
    const primes = []
    for (let i = 2; i < n; i++) {
        if (isPrime(i)) {
            primes.push(i)
        }
    }
    return primes
}

function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false
        }
    }
    return true
}

function getLargestPrimeFactor(n) {
    const primeFactors = []
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            primeFactors.push(i)
        }
    }
    return primeFactors.pop()
}

function solution(value) {
    const primes = getPrimes(value)
    console.log(primes)
    const sum = primes.reduce((acc, curr) => acc + curr, 0)
    console.log(sum)
    const threeRightMostDigits = sum.toString().slice(-3)
    console.log(threeRightMostDigits)
    const largestPrimeFactor = getLargestPrimeFactor(threeRightMostDigits)
    console.log(largestPrimeFactor)
    return largestPrimeFactor
}

solution(100003)