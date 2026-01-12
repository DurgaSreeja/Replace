function counter(initial = 0) {
    // Add your code here
    let count =initial;

    return {
        increment : () => ++count,
        decrement : () => --count,
        getCount : () => count
    }

}

module.exports = counter;
