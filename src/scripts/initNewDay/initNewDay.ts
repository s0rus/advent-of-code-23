import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';

const args = process.argv.slice(2);
const day = args[0];
if (!day) {
  console.log('Please run with the day to bootstrap, i.e. npm run init-day 1');
}
console.log(`creating template for day ${day}`);
const basePath = 'src/days';

if (existsSync(`src/days/${day}`)) {
  console.log(`day ${day} already exists`);
  process.exit(0);
}
const newDayPath = `${basePath}/${day}`;
mkdirSync(newDayPath);
copyFileSync(`${__dirname}/puzzle.ts.tpl`, `${newDayPath}/puzzle.ts`);
writeFileSync(`${newDayPath}/input.txt`, '');
