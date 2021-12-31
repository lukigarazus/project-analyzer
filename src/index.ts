import { Project } from 'ts-morph';

import { analyzeVariables } from './analyzers/variable';

console.log('Starting...');

// initialize
const project = new Project({
  // Optionally specify compiler options, tsconfig.json, in-memory file system, and more here.
  // If you initialize with a tsconfig.json, then it will automatically populate the project
  // with the associated source files.
  // Read more: https://ts-morph.com/setup/
  tsConfigFilePath: './test/tsconfig.json',
});

const sourceFiles = project.getSourceFiles(
  '/Users/lukigarazus/code/apps/project-analyzer/test/**/*.ts'
);

for (const sourceFile of sourceFiles) {
  const name = sourceFile.getBaseName();
  const path = sourceFile.getFilePath();
  console.log('---------------------------------');
  console.log(`File: ${name}`);
  console.log(`Path: ${path}`);

  console.log('-------------------------------');
  analyzeVariables(sourceFile);
  console.log('-------------------------------');

  console.log('---------------------------------');
}
