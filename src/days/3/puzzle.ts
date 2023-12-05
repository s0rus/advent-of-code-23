type Cell = {
  value: string;
  row: number;
  col: number;
};

const isNumber = (input: unknown): input is number => !isNaN(Number(input));
const isDot = (input: string) => input === '.' || input === undefined;
const isValidAdjEl = (input: unknown) =>
  !isDot(String(input)) && input !== undefined && !'*#+$/&%-@='.includes(String(input));

function findAdjNumbers(matrix: string[][], startRow: number, startCol: number, exploreLeft: boolean = false) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  const result: string[] = [];
  const queue: { row: number; col: number }[] = [];

  queue.push({ row: startRow, col: startCol });

  while (queue.length > 0) {
    const { row, col } = queue.shift()!;

    if (visited[row][col]) {
      continue;
    }

    visited[row][col] = true;
    const currentValue = matrix[row][col];

    if (isValidAdjEl(currentValue)) {
      result.push(currentValue);

      if (col - 1 >= 0 && !visited[row][col - 1]) {
        queue.push({ row, col: col - 1 });
      }

      if (col + 1 < cols && !visited[row][col + 1]) {
        queue.push({ row, col: col + 1 });
      }
    }
  }

  if (exploreLeft) {
    return Number(result.reverse().reduce((acc, v) => acc + v, ''));
  }

  return Number(result.reduce((acc, v) => acc + v, ''));
}

const first = (input: string) => {
  console.log(input);
  let sum = 0;
  const parsedInput = input.split('\n').map((line) => line.split(''));

  parsedInput.forEach((row, i, rows) => {
    row.forEach((col, j, cols) => {
      if ('*#+$/&%-@='.includes(col)) {
        [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ].forEach(([rowOffset, colOffset]) => {
          if (rows[i + rowOffset] && rows[i + rowOffset][j + colOffset]) {
            const symbol = rows[i + rowOffset][j + colOffset];

            if (isDot(symbol) && rowOffset !== 0) {
              // ? up/down left
              if (isNumber(rows[i + rowOffset][j - 1])) {
                sum = sum + findAdjNumbers(rows, i + rowOffset, j - 1, true);
                console.log(findAdjNumbers(rows, i + rowOffset, j - 1, true));
              }
              // ? up/down right
              if (isNumber(rows[i + rowOffset][j + 1])) {
                sum = sum + findAdjNumbers(rows, i + rowOffset, j + 1);
                console.log(findAdjNumbers(rows, i + rowOffset, j + 1));
              }
            } else if (isNumber(symbol) && rowOffset === 0) {
              // ? left/right

              sum = sum + findAdjNumbers(rows, i + rowOffset, j + colOffset, colOffset < 0);
              console.log(findAdjNumbers(rows, i + rowOffset, j + colOffset, colOffset < 0));
            } else if (isNumber(symbol) && rowOffset !== 0) {
              if (isNumber(rows[i + rowOffset][j - 1]) && isNumber(rows[i + rowOffset][j + 1])) {
                sum = sum + Number(`${rows[i + rowOffset][j - 1]}${symbol}${rows[i + rowOffset][j + 1]}`);
                console.log(Number(`${rows[i + rowOffset][j - 1]}${symbol}${rows[i + rowOffset][j + 1]}`));
              } else {
                if (!isValidAdjEl(rows[i + rowOffset][j - 1]) && !isValidAdjEl(rows[i + rowOffset][j + 1])) {
                  sum = sum + Number(symbol);
                }

                if (rowOffset > 0) {
                  if (isNumber(rows[i + rowOffset][j - 1])) {
                    sum = sum + findAdjNumbers(rows, i + rowOffset, j, true);
                    console.log(findAdjNumbers(rows, i + rowOffset, j, true));
                  } else if (isNumber(rows[i + rowOffset][j + 1])) {
                    sum = sum + findAdjNumbers(rows, i + rowOffset, j);
                    console.log(findAdjNumbers(rows, i + rowOffset, j));
                  }
                }

                if (rowOffset < 0) {
                  if (isNumber(rows[i + rowOffset][j - 1])) {
                    sum = sum + findAdjNumbers(rows, i + rowOffset, j, true);
                    console.log(findAdjNumbers(rows, i + rowOffset, j, true));
                  }
                  if (isNumber(rows[i + rowOffset][j + 1])) {
                    sum = sum + findAdjNumbers(rows, i + rowOffset, j);
                    console.log(findAdjNumbers(rows, i + rowOffset, j));
                  }
                }
              }
            }
          }
        });
      }
    });
  });

  return sum;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  return '';
};

const expectedSecondSolution = 'solution 2';

export { expectedFirstSolution, expectedSecondSolution, first, second };
