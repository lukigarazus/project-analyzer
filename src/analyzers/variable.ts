import { SourceFile, Node, VariableDeclaration } from 'ts-morph';

import {
  resolveReferenceFully,
  isReference,
  mapReferencePathToString,
  resolveReferencePath,
} from '../utils/reference';

const getVariableValue = (node: VariableDeclaration): Node | void => {
  return node.getInitializer();
};

const getFullyResolvedVariableValue = (
  node: VariableDeclaration
): Node | void => {
  const value = getVariableValue(node);
  if (value && isReference(value)) {
    return resolveReferenceFully(value);
  }
  return value;
};

const getResolvedVariableValuePath = (
  node: VariableDeclaration
): Node[] | void => {
  const value = getVariableValue(node);
  if (value) return resolveReferencePath(value).concat(node.getNameNode());
};

const getResolvedVariableValuePathString = (
  node: VariableDeclaration
): string | void => {
  const path = getResolvedVariableValuePath(node);
  if (path) return mapReferencePathToString(path);
};

export const analyzeVariables = (sourceFile: SourceFile): void => {
  const variables = sourceFile.getVariableDeclarations();

  const variableValues = variables.forEach((variable) => {
    console.log('-------------------------------');
    console.log(`variable: ${variable.getName()}`);

    console.log(`variable value: ${getVariableValue(variable)?.getText()}`);
    console.log(
      `resolved variable value: ${getFullyResolvedVariableValue(
        variable
      )?.getText()}`
    );
    console.log(
      `variable reference path: ${getResolvedVariableValuePathString(variable)}`
    );

    console.log('-------------------------------');
  });
};
