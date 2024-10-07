export function josephus(N, K) {
  const arr = [];

  for (let i = 0; i < N; i++) {
    arr.push(i + 1);
  }

  let idx = 0;
  while (arr.length > 1) {
    idx = (idx + K - 1) % arr.length;
    arr.splice(idx, 1);
  }

  return arr[0];
}

console.log(josephus(5, 2));
