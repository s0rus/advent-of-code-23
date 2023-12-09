const first = (input: string) => {
  const stories = input.split(/\n/).map((v) => v.split(' ').map(Number));
  function findDifferences(story: number[], currentSequences: number[][]) {
    const sequences: number[][] = currentSequences;
    const sequence: number[] = [];
    story.forEach((number, idx, arr) => {
      if (arr[idx + 1] !== undefined) {
        sequence.push(arr[idx + 1] - number);
      }
    });
    sequences.push(sequence);
    if (!sequence.every((v) => v === 0)) {
      findDifferences(sequence, sequences);
    }
    return sequences;
  }

  function extrapolate(sequences: number[][]) {
    sequences.reverse().forEach((sequence, idx, arr) => {
      if (idx === 0) {
        sequence.push(0);
      } else {
        sequence.push(arr[idx - 1][arr[idx - 1].length - 1] + sequence[sequence.length - 1]);
      }
    });
    return sequences;
  }

  return stories.reduce((acc, story) => {
    const sequences = extrapolate(findDifferences(story, [story]));
    return acc + sequences[sequences.length - 1][sequences[sequences.length - 1].length - 1];
  }, 0);
};

const expectedFirstSolution = '1834108701';

const second = (input: string) => {
  const stories = input.split(/\n/).map((v) => v.split(' ').map(Number));

  function findDifferences(story: number[], currentSequences: number[][]) {
    const sequences: number[][] = currentSequences;
    const sequence: number[] = [];
    story.forEach((number, idx, arr) => {
      if (arr[idx + 1] !== undefined) {
        sequence.push(arr[idx + 1] - number);
      }
    });

    sequences.push(sequence);

    if (!sequence.every((v) => v === 0)) {
      findDifferences(sequence, sequences);
    }

    return sequences;
  }

  function extrapolate(sequences: number[][]) {
    sequences.reverse().forEach((sequence, idx, arr) => {
      if (idx === 0) {
        sequence.unshift(0);
      } else {
        sequence.unshift(sequence[0] - arr[idx - 1][0]);
      }
    });

    return sequences;
  }

  return stories.reduce((acc, story) => {
    const sequences = extrapolate(findDifferences(story, [story]));
    return acc + sequences[sequences.length - 1][0];
  }, 0);
};

const expectedSecondSolution = '993';

export { expectedFirstSolution, expectedSecondSolution, first, second };
