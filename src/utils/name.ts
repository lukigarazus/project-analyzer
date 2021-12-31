import {
  SourceFile,
  SyntaxKind,
  ArrowFunction,
  FunctionDeclaration,
  MethodDeclaration,
  ConstructorDeclaration,
  VariableDeclaration,
  Node,
  ClassDeclaration,
  FunctionExpression,
  ObjectLiteralExpression,
  PropertyAssignment,
  ImportDeclaration,
  Identifier,
  NumericLiteral,
  StringLiteral,
} from 'ts-morph';

import { resolveMeaningfulNodePath, resolveNodePath } from './path';

const standardVariableGetName = (fallback: string) => (variable: Node) => {
  const parent = variable.getParent();
  if (parent.getKind() === SyntaxKind.VariableDeclaration) {
    const variableDeclaration = parent as VariableDeclaration;
    return variableDeclaration.getName();
  } else if (parent.getKind() === SyntaxKind.PropertyAssignment) {
    const propertyAssignment = parent as PropertyAssignment;
    return propertyAssignment.getName();
  }
  return fallback;
};

const getArrowFunctionName = standardVariableGetName('AnonymousArrowFunction');

const getFunctionExpressionName = standardVariableGetName('AnonymousFunction');

const getObjectLiteralName = standardVariableGetName('AnonymousObject');

export const getNodeName = (node: Node): string => {
  if (node instanceof ArrowFunction) {
    return getArrowFunctionName(node);
  } else if (node instanceof FunctionExpression) {
    return getFunctionExpressionName(node);
  } else if (node instanceof ObjectLiteralExpression) {
    return getObjectLiteralName(node);
  } else if (node instanceof ConstructorDeclaration) {
    return 'constructor';
  } else if (
    node instanceof Identifier ||
    node instanceof NumericLiteral ||
    node instanceof StringLiteral
  ) {
    return node.getText();
  } else if (
    node instanceof ClassDeclaration ||
    node instanceof MethodDeclaration ||
    node instanceof FunctionDeclaration
  ) {
    return node.getName();
  } else if (node instanceof SourceFile) {
    return node.getBaseNameWithoutExtension();
  } else if (node instanceof ImportDeclaration) {
    return node.getModuleSpecifier().getLiteralText();
  } else {
    return node.getKindName();
  }
};

export const mapNodePathToString = (
  nodePath: Node[],
  delimiter = '.'
): string => nodePath.map((node) => getNodeName(node)).join(delimiter);

export const getFullMeaningfulNodeName = (node: Node): string =>
  mapNodePathToString(resolveMeaningfulNodePath(node));

export const getFullNodeName = (node: Node): string =>
  mapNodePathToString(resolveNodePath(node));
