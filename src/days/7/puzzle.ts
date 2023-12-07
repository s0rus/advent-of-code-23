type Round = {
  hand: string;
  bid: number;
};

const cardStrength = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1,
};

function getHandStrength(hand: string) {
  const cards = hand.split('').reduce<{ [key: string]: number }>((acc, v) => {
    acc[v] = acc[v] ? acc[v] + 1 : 1;
    return acc;
  }, {});

  const jokers = cards['J'];
  delete cards['J'];

  const duplicates = Object.values(cards)
    .filter((v) => v >= 2)
    .sort((a, b) => b - a);

  if (!duplicates.length && jokers) {
    switch (true) {
      case jokers === 5:
      case jokers + 1 === 5:
        return 7;
      case jokers + 1 === 4:
        return 6;
      case jokers + 1 === 3:
        return 4;
      case jokers + 1 === 2:
        return 2;
      default:
        return 1;
    }
  }

  if (duplicates[0]) {
    duplicates[0] = duplicates[0] + (jokers || 0);
  }

  switch (true) {
    case duplicates[0] === 5:
      return 7;
    case duplicates[0] === 4:
      return 6;
    case duplicates[0] === 3 && duplicates[1] === 2:
      return 5;
    case duplicates[0] === 3:
      return 4;
    case duplicates[0] === 2 && duplicates[1] === 2:
      return 3;
    case duplicates[0] === 2:
      return 2;
    default:
      return 1;
  }
}

function compareCards(handOne: string[], handTwo: string[]) {
  const elOne = handOne.shift();
  const elTwo = handTwo.shift();

  if (!elOne || !elTwo) {
    return undefined;
  }

  if (cardStrength[elOne] === cardStrength[elTwo]) {
    return compareCards(handOne, handTwo);
  }

  return cardStrength[elOne] > cardStrength[elTwo];
}

function bubbleSort(arr: Round[]) {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (arr[j + 1]?.hand) {
        const currentStrength = getHandStrength(arr[j].hand);
        const nextStrength = getHandStrength(arr[j + 1].hand);

        if (currentStrength === nextStrength) {
          const isCurrentStronger = compareCards(arr[j].hand.split(''), arr[j + 1].hand.split(''));
          if (isCurrentStronger) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        } else if (currentStrength > nextStrength) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  }

  return arr;
}

const first = (input: string) => {
  return '';
  // return bubbleSort(
  //   input.split(/\n/).map((line) => {
  //     const [hand, bid] = line.split(' ');

  //     return {
  //       hand,
  //       bid: Number(bid),
  //     };
  //   })
  // ).reduce((acc, v, i) => acc + v.bid * (i + 1), 0);
};

const expectedFirstSolution = '247823654';

const second = (input: string) => {
  return bubbleSort(
    input.split(/\n/).map((line) => {
      const [hand, bid] = line.split(' ');

      return {
        hand,
        bid: Number(bid),
      };
    })
  ).reduce((acc, v, i) => acc + v.bid * (i + 1), 0);
};

const expectedSecondSolution = '245461700';

export { expectedFirstSolution, expectedSecondSolution, first, second };
