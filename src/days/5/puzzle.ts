type Range = {
  destination: {
    start: number;
    end: number;
  };
  source: {
    start: number;
    end: number;
  };
  rangeLength: number;
};

type MapTitle =
  | 'seed-to-soil'
  | 'soil-to-fertilizer'
  | 'fertilizer-to-water'
  | 'water-to-light'
  | 'light-to-temperature'
  | 'temperature-to-humidity'
  | 'humidity-to-location';

const first = (input: string) => {
  // const [seedsString, ...unparsedMaps] = input.split(/\n\n/);
  // const seeds = seedsString.split(': ')[1].split(/\s+/).map(Number);
  // const maps = parseMaps(unparsedMaps);

  // const locations = seeds.map((seed) => {
  //   const soil = findCorrespondingNumber(seed, maps['seed-to-soil']);
  //   const fertilizer = findCorrespondingNumber(soil, maps['soil-to-fertilizer']);
  //   const water = findCorrespondingNumber(fertilizer, maps['fertilizer-to-water']);
  //   const light = findCorrespondingNumber(water, maps['water-to-light']);
  //   const temperature = findCorrespondingNumber(light, maps['light-to-temperature']);
  //   const humidity = findCorrespondingNumber(temperature, maps['temperature-to-humidity']);
  //   const location = findCorrespondingNumber(humidity, maps['humidity-to-location']);
  //   return location;
  // });

  // return Math.min(...locations);
  return '';
};

const expectedFirstSolution = '309796150';

function parseSeedRanges(unparsedSeedRanges: number[]) {
  const seedRanges = unparsedSeedRanges.reduce<{ start: number; end: number; rangeLength: number }[]>(
    (acc, s, i, a) => {
      if (i % 2 === 0) {
        acc.push({
          start: s,
          end: s + a[i + 1] - 1,
          rangeLength: a[i + 1],
        });
      }
      return acc;
    },
    []
  );

  return seedRanges;
}

function parseRange(rangeString: string): Range {
  const [destination, source, length] = rangeString.split(/\s+/);
  return {
    destination: {
      start: Number(destination),
      end: Number(destination) + Number(length) - 1,
    },
    source: {
      start: Number(source),
      end: Number(source) + Number(length) - 1,
    },
    rangeLength: Number(length),
  };
}

function findCorrespondingNumber(inputNumber: number, ranges: Range[]) {
  const foundRange = ranges.find((range) => inputNumber >= range.source.start && inputNumber <= range.source.end);

  if (!foundRange) {
    return inputNumber;
  }

  return inputNumber + (foundRange.destination.start - foundRange.source.start);
}

function parseMaps(unparsedMaps: string[]) {
  return unparsedMaps.reduce<Record<MapTitle, Range[]>>(
    (acc, m) => {
      const [unparsedTitle, ...ranges] = m.split(/\n/);
      const mapTitle = unparsedTitle.split(' ')[0] as MapTitle;

      acc[mapTitle] = ranges.map(parseRange);
      return acc;
    },
    {} as Record<MapTitle, Range[]>
  );
}

function getLocation(seed: number, maps: Record<MapTitle, Range[]>) {
  const soil = findCorrespondingNumber(seed, maps['seed-to-soil']);
  const fertilizer = findCorrespondingNumber(soil, maps['soil-to-fertilizer']);
  const water = findCorrespondingNumber(fertilizer, maps['fertilizer-to-water']);
  const light = findCorrespondingNumber(water, maps['water-to-light']);
  const temperature = findCorrespondingNumber(light, maps['light-to-temperature']);
  const humidity = findCorrespondingNumber(temperature, maps['temperature-to-humidity']);
  const location = findCorrespondingNumber(humidity, maps['humidity-to-location']);
  return location;
}

// !!! GARBAGE BRUTEFORCE SOLUTION OMEGALUL

const second = (input: string) => {
  const [seedsString, ...unparsedMaps] = input.split(/\n\n/);
  const unparsedSeedRanges = seedsString.split(': ')[1].split(/\s+/).map(Number);
  const seedsRanges = parseSeedRanges(unparsedSeedRanges);
  const maps = parseMaps(unparsedMaps);

  let lowestLocation = Number.MAX_SAFE_INTEGER;

  seedsRanges.forEach((range) => {
    const { start, end } = range;
    for (let i = start; i <= end; i++) {
      const l = getLocation(i, maps);
      lowestLocation = lowestLocation > l ? l : lowestLocation;
    }
  });

  return lowestLocation;
};

const expectedSecondSolution = '50716416';

export { expectedFirstSolution, expectedSecondSolution, first, second };
