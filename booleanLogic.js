function booleanLogic(a, b) {
  // Add your code here
  return {
    and : a & b,
    or : a | b,
    notA : !a,
    notB : !b
  }
}

module.exports = booleanLogic;
