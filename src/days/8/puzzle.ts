const first = (input: string) => {
  const [dirString, instStr] = input.split(/\n\n/);
  const instructions = instStr.split(/\n/).reduce((acc, v) => {
    const [target, nexts] = v.split(' = ');

    acc[target] = nexts.substring(1, nexts.length - 1).split(', ');
    return acc;
  }, {});
  const directions = dirString.split('');

  let steps = 0;

  function getNext(instruction: string, direction: 'L' | 'R') {
    return instructions[instruction][direction === 'L' ? 0 : 1];
  }

  function walk(directionArr: string[], nextInstruction: string) {
    steps++;

    let dirs = directionArr;
    let nextDirection = dirs.shift();

    if (!nextDirection) {
      dirs = [...directions];
      nextDirection = dirs.shift();
    }

    if (nextInstruction === 'ZZZ') {
      return;
    }

    walk(dirs, getNext(nextInstruction, nextDirection as 'L' | 'R'));
  }

  walk(directions.slice(1), getNext('AAA', directions[0] as 'L' | 'R'));

  return steps;
};

const expectedFirstSolution = '12599';

const second = (input: string) => {
  const [dirString, instStr] = input.split(/\n\n/);
  const directions = dirString.split('');
  const instructions = instStr.split(/\n/).reduce((acc, v) => {
    const [target, nexts] = v.split(' = ');

    acc[target] = nexts.substring(1, nexts.length - 1).split(', ');
    return acc;
  }, {});
  const startInstructions = Object.keys(instructions).filter((v) => v.endsWith('A'));
  const steps = {};

  function getNext(instruction: string, direction: 'L' | 'R') {
    return instructions[instruction][direction === 'L' ? 0 : 1];
  }

  startInstructions.forEach((instruction) => {
    let step = 0;

    function walk(directionArr: string[], nextInstruction: string) {
      step++;
      let dirs = directionArr;
      let nextDirection = dirs.shift();

      if (!nextDirection) {
        dirs = [...directions];
        nextDirection = dirs.shift();
      }

      if (nextInstruction.endsWith('Z')) {
        return;
      }

      walk(dirs, getNext(nextInstruction, nextDirection as 'L' | 'R'));
    }

    walk(directions.slice(1), getNext(instruction, directions[0] as 'L' | 'R'));

    steps[instruction] = step;
  });

  function getLcm(values: number[]) {
    const gcd = (a: number, b: number) => (b === 0 ? a : gcd(b, a % b));
    const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

    return values.reduce((acc, val) => lcm(acc, val), 1);
  }

  function getSteps(startInstructions: string[]) {
    const lcm = getLcm(Object.values<number>(steps));

    return lcm;
  }

  return getSteps(startInstructions);
};

const expectedSecondSolution = '8245452805243';

export { expectedFirstSolution, expectedSecondSolution, first, second };
