import {
  SourceFile,
  ArrowFunction,
  FunctionDeclaration,
  MethodDeclaration,
  ConstructorDeclaration,
  Node,
  ClassDeclaration,
} from "ts-morph";

import { resolveNodePath } from "./path";

const CONTEXT_KINDS = [
  SourceFile,
  ClassDeclaration,
  MethodDeclaration,
  ConstructorDeclaration,
  FunctionDeclaration,
  ArrowFunction,
] as const;

export const getNodeContext = (node: Node): Node => {
  const path = resolveNodePath(node);
  const context = path
    .reverse()
    .find((node) => CONTEXT_KINDS.find((kind) => node instanceof kind));
  return context;
};
