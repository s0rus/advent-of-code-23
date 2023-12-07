const first = (input: string) => {
  const [time, distance] = input.split(/\n/).map((l) =>
    l
      .split(': ')[1]
      .split(' ')
      .filter((x) => x)
      .map(Number)
  );

  let multiplied = 1;

  time.forEach((time, idx) => {
    let ways = 0;
    for (let i = 1; i <= time; i++) {
      if (i * (time - i) > distance[idx]) {
        ways++;
      }
    }
    multiplied = multiplied * ways;
  });

  return multiplied;
};

const expectedFirstSolution = '440000';

const second = (input: string) => {
  const [time, distance] = input.split(/\n/).map((l) => Number(l.split(': ')[1].split(/\s+/).join('')));
  let ways = 0;

  for (let i = 1; i <= time; i++) {
    if (i * (time - i) > distance) {
      ways++;
    }
  }

  return ways;
};

const expectedSecondSolution = '26187338';

export { expectedFirstSolution, expectedSecondSolution, first, second };
