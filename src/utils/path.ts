import {
  Project,
  SourceFile,
  SyntaxKind,
  Expression,
  Identifier,
  PropertyAccessExpression,
  ArrowFunction,
  FunctionDeclaration,
  MethodDeclaration,
  ConstructorDeclaration,
  VariableDeclaration,
  Node,
  ClassDeclaration,
  FunctionExpression,
  VariableDeclarationList,
  VariableStatement,
  CallExpression,
  ExpressionStatement,
  ParenthesizedExpression,
  ObjectLiteralExpression,
  PropertyAssignment,
  Constructor,
  Block,
  NamedImports,
  ImportClause,
  ImportDeclaration,
} from "ts-morph";

const MEANINGLESS_KINDS = [
  VariableDeclaration,
  VariableDeclarationList,
  VariableStatement,
  CallExpression,
  ExpressionStatement,
  ParenthesizedExpression,
  PropertyAssignment,
  Block,
  NamedImports,
  ImportClause,
];

export const resolveMeaningfulNodePath = (node: Node): Node[] => {
  const path = resolveNodePath(node);

  const meaningfulPath = path.filter((el) => {
    return !MEANINGLESS_KINDS.find((un) => el instanceof un);
  });

  return meaningfulPath;
};

export const resolveNodePath = (node: Node): Node[] => {
  const result: Node[] = [];
  let parent = node;
  const predicate = () =>
    parent instanceof SourceFile || parent instanceof ImportDeclaration;
  while (!predicate()) {
    result.push(parent);
    parent = parent.getParent();
  }
  if (predicate()) {
    result.push(parent);
  }
  result.reverse();
  return result;
};

export const resolveNodeModule = (node: Node): Node => {
  const path = resolveNodePath(node);
  return path[0];
};
