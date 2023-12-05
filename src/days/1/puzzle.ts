const first = (input: string) => {
  return input
    .split('\n')
    .map((s) =>
      s
        .split('')
        .filter((v) => !isNaN(Number(v)))
        .reduce((_acc, v, _i, a) => (a.length === 1 ? v.repeat(2) : `${a[0]}${a[a.length - 1]}`), '')
    )
    .reduce((acc, v) => acc + parseInt(v, 10), 0);
};

const expectedFirstSolution = '55130';

const second = (input: string) => {
  const regex = /one|two|three|four|five|six|seven|eight|nine/gi;
  const replacements = {
    one: 'o1e',
    two: 't2o',
    three: 't3e',
    four: 'f4r',
    five: 'f5e',
    six: 's6x',
    seven: 's7n',
    eight: 'e8t',
    nine: 'n9e',
  };

  return input
    .split('\n')
    .map((s) =>
      s
        .replace(regex, (m: keyof typeof replacements) => replacements[m])
        .replace(regex, (m: keyof typeof replacements) => replacements[m])
        .split('')
        .filter((v) => !isNaN(Number(v)))
        .reduce((_acc, v, _i, a) => (a.length === 1 ? v.repeat(2) : `${a[0]}${a[a.length - 1]}`), '')
    )
    .reduce((acc, v) => acc + parseInt(v, 10), 0);
};

const expectedSecondSolution = '54985';

export { expectedFirstSolution, expectedSecondSolution, first, second };
