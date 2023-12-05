const first = (input: string) => {
  const gameConstrainst = {
    red: 12,
    green: 13,
    blue: 14,
  };

  return input
    .split('\n')
    .map((line) =>
      line
        .split(': ')[1]
        .split('; ')
        .map((s) => {
          const p = s.split(', ');

          return p.every((el) => {
            const [count, color] = el.split(' ');
            return gameConstrainst[color as keyof typeof gameConstrainst] >= Number(count);
          });
        })
        .every((e) => e)
    )
    .reduce((acc, v, i) => (v ? acc + (i + 1) : acc), 0);
};

const expectedFirstSolution = '2256';

const second = (input: string) => {
  return input
    .split('\n')
    .map((line) => {
      const gameState = {
        red: 0,
        green: 0,
        blue: 0,
      };

      line
        .split(': ')[1]
        .split('; ')
        .forEach((s) => {
          const p = s.split(', ');
          return p.forEach((el) => {
            const [count, color] = el.split(' ');
            if (gameState[color as keyof typeof gameState] < Number(count)) {
              gameState[color as keyof typeof gameState] = Number(count);
            }
          });
        });

      return Object.values(gameState).reduce((acc, v) => acc * v, 1);
    })
    .reduce((acc, v) => acc + v, 0);
};

const expectedSecondSolution = '74229';

export { expectedFirstSolution, expectedSecondSolution, first, second };
