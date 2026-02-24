export function getIncrementLevel(totalBBs) {
  let n = 0;
  while ((2 ** (n + 1) - 1) <= totalBBs) {
    n++;
  }
  return n;
}