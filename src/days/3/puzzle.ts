const isNumberCheck = (input: unknown): input is number => !isNaN(Number(input));
const isDot = (input: unknown) => input === '.';

const directions = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

const first = (input: string) => {
  return '';
  // console.log(input);

  // const parsedInput = input.split('\n').map((line) => line.split(''));

  // function getSymbol(row: number, col: number, [rowOffset, colOffset]) {
  //   const symbol = parsedInput[row + rowOffset];

  //   if (symbol === undefined) {
  //     return undefined;
  //   }

  //   return symbol[col + colOffset];
  // }

  // let sum = 0;

  // parsedInput.forEach((row, i) => {
  //   let isNumber = false;
  //   let currentNumber = '';
  //   let toCheck = true;

  //   row.forEach((_, j) => {
  //     isNumber = isNumberCheck(getSymbol(i, j, [0, 0]));

  //     if (!isNumber && !toCheck) {
  //       sum += parseInt(currentNumber);
  //     }

  //     if (!isNumber) {
  //       currentNumber = '';
  //       toCheck = true;
  //     }

  //     if (isNumber && toCheck) {
  //       const isValid = directions.reduce((acc, [rowOffset, colOffset]) => {
  //         const symbol = getSymbol(i, j, [rowOffset, colOffset]);
  //         return acc || (!isDot(symbol) && !isNumberCheck(symbol) && symbol !== undefined);
  //       }, false);

  //       if (isValid) {
  //         toCheck = false;
  //       }
  //     }

  //     if (isNumber) {
  //       currentNumber += getSymbol(i, j, [0, 0]);
  //     }
  //   });

  //   if (isNumber && !toCheck) {
  //     sum += parseInt(currentNumber);
  //   }
  // });

  // return sum;
};

const expectedFirstSolution = '517021';

const second = (input: string) => {
  console.log(input);

  const parsedInput = input.split('\n').map((line) => line.split(''));

  function getSymbol(row: number, col: number, [rowOffset, colOffset]) {
    const symbol = parsedInput[row + rowOffset];

    if (symbol === undefined) {
      return undefined;
    }

    return symbol[col + colOffset];
  }

  const origins: { x: number; y: number; value: number | null }[] = [];

  parsedInput.forEach((row, i) => {
    let isNumber = false;
    let currentNumber = '';
    let toCheck = true;

    row.forEach((_, j) => {
      isNumber = isNumberCheck(getSymbol(i, j, [0, 0]));

      if (!isNumber && !toCheck) {
        const idx = origins.findIndex((v) => v.value === null);
        origins[idx].value = Number(currentNumber);
      }

      if (!isNumber) {
        currentNumber = '';
        toCheck = true;
      }

      if (isNumber && toCheck) {
        const isValid = directions.reduce((acc, [rowOffset, colOffset]) => {
          const symbol = getSymbol(i, j, [rowOffset, colOffset]);
          if (symbol === '*') {
            origins.push({
              x: i + rowOffset,
              y: j + colOffset,
              value: null,
            });
          }
          return acc || (!isDot(symbol) && !isNumberCheck(symbol) && symbol !== undefined && symbol === '*');
        }, false);

        if (isValid) {
          toCheck = false;
        }
      }

      if (isNumber) {
        currentNumber += getSymbol(i, j, [0, 0]);
      }
    });

    if (isNumber && !toCheck) {
      const idx = origins.findIndex((v) => v.value === null);
      origins[idx].value = Number(currentNumber);
    }
  });

  const gearRatios = origins.filter((v) => origins.filter((el) => el.x === v.x && el.y === v.y).length > 1);
  const aggregatedGearRatios = gearRatios.reduce<typeof gearRatios>((result, element) => {
    const { x, y, value } = element;

    const existing = result.find((item) => item.x === x && item.y === y);

    if (existing && existing.value) {
      existing.value *= value!;
    } else {
      result.push({ x, y, value });
    }

    return result;
  }, []);

  return aggregatedGearRatios.reduce((acc, v) => acc + v.value!, 0);
};

const expectedSecondSolution = '81296995';

export { expectedFirstSolution, expectedSecondSolution, first, second };
