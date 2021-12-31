import {
  Identifier,
  Node,
  VariableDeclaration,
  PropertyAccessExpression,
} from 'ts-morph';
import { getNodeName, mapNodePathToString } from './name';
import { getFullPropertyAccessPathString } from './propertyAccess';

const resolveDefinition = (node: Node): Node => {
  if (node instanceof VariableDeclaration) {
    return node.getInitializer();
  }
  return node;
};

export const isReference = (node: Node): boolean => {
  return !![Identifier, PropertyAccessExpression].find(
    (type) => node instanceof type
  );
};

export const mapReferencePathToString = (path: Node[]): string =>
  mapNodePathToString(path, ' <= ');

export const resolveReferencePathString = (node: Node): string => {
  return mapReferencePathToString(resolveReferencePath(node));
};

export const resolveReferencePath = (node: Node): Node[] => {
  if (isReference(node)) {
    const resolvedReference = resolveReference(node);
    if (resolvedReference)
      return [...resolveReferencePath(resolvedReference), node];
  }
  return [node];
};

export const resolveReferenceFully = (node: Node): Node | void => {
  const referencePath = resolveReferencePath(node);
  return referencePath[0];
};

export const resolveReference = (reference: Node): Node | void => {
  if (!isReference(reference)) return undefined;

  if (reference instanceof Identifier) {
    const definitions = reference.getDefinitionNodes();

    if (definitions.length === 0) {
      return undefined;
    }

    const definition = definitions[0];
    const resolvedDefinition = resolveDefinition(definition);

    return resolvedDefinition;
  }
  if (reference instanceof PropertyAccessExpression) {
    const path = getFullPropertyAccessPathString(reference);
    console.log(`path: ${path}`);
  }
};
