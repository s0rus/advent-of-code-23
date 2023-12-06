const first = (input: string) => {
  return '';
  // function parseData(data: string) {
  //   return data
  //     .split(':')[1]
  //     .split(/\s+/)
  //     .filter((x) => x)
  //     .map(Number);
  // }

  // const [tS, dS] = input.split(/\n/);
  // const times = parseData(tS);
  // const distances = parseData(dS);

  // let multiplied = 1;

  // times.forEach((time, idx) => {
  //   let ways = 0;
  //   for (let i = 1; i <= time; i++) {
  //     if (i * (time - i) > distances[idx]) {
  //       ways++;
  //     }
  //   }
  //   multiplied = multiplied * ways;
  // });

  // return multiplied;
};

const expectedFirstSolution = '440000';

const second = (input: string) => {
  function parseData(data: string) {
    return Number(
      data
        .split(':')[1]
        .split(/\s+/)
        .filter((x) => x)
        .join('')
    );
  }

  const [tS, dS] = input.split(/\n/);
  const time = parseData(tS);
  const distance = parseData(dS);

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
