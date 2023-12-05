import { readdirSync } from 'fs';
import { describe, expect, it } from 'vitest';
import Puzzle from './types/puzzle';
import readFile from './utils/read-file';

describe('AoC test runner', () => {
  const dirs = readdirSync('./src/days', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const day of dirs) {
    it(`Tests day ${day}`, async () => {
      let input = '';
      const puzzleName = day;
      try {
        const puzzlePath = `src/days/${puzzleName}`;
        input = await readFile(`${puzzlePath}/input.txt`);
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
      const { first, expectedFirstSolution, second, expectedSecondSolution }: Puzzle = await import(
        `./days/${puzzleName}/puzzle`
      );

      expect(first(input)).toBe(expectedFirstSolution);
      expect(second(input)).toBe(expectedSecondSolution);
    });
  }
});
