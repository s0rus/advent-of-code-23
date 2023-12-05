const first = (input: string) => {
  return '';
  // return input
  //   .split('\n')
  //   .map((l) => {
  //     const [wS, nS] = l.split(': ')[1].split(' | ');
  //     const w = nS.split(/\s+/).filter((v) => wS.trim().split(/\s+/).includes(v));
  //     return w.length === 0 ? 0 : 2 ** (w.length - 1);
  //   })
  //   .reduce((acc, v) => acc + v, 0);
};

const expectedFirstSolution = '24848';

interface Card {
  id: number;
  game: string[];
}

const second = (input: string) => {
  function getMatchingNumbers(arr: string[]) {
    const [wS, nS] = arr;
    return nS.split(/\s+/).filter((v) => wS.trim().split(/\s+/).includes(v));
  }

  const cards: Card[] = input.split('\n').map((l) => {
    const [iS, gS] = l.split(': ');

    return {
      id: Number(iS.split(/\s+/)[1]),
      game: gS.trim().split(' | '),
    };
  });

  const allCopies = [...cards];
  let currentId = 1;
  let queue = [...cards];

  while (queue.length > 0) {
    const currentCards = allCopies.filter((v) => v.id === currentId);
    currentCards.forEach((card) => {
      const copies = [...cards].slice(card.id, card.id + getMatchingNumbers(card.game).length);
      allCopies.push(...copies);
    });
    queue = queue.filter((v) => v.id !== currentId);
    currentId++;
  }

  return allCopies.length;
};

const expectedSecondSolution = '7258152';

export { expectedFirstSolution, expectedSecondSolution, first, second };
