import { PropertyAccessExpression, Node } from 'ts-morph';

import { resolveReferenceFully } from './reference';

export const getPropertyAccessKeysPath = (
  node: PropertyAccessExpression
): string[] => {
  const root = node.getExpression();
  const key = node.getName();
  if (root instanceof PropertyAccessExpression) {
    return [...getPropertyAccessKeysPath(root), key];
  } else return [key];
};

export const getPropertyAccessRoot = (node: PropertyAccessExpression): Node => {
  const root = node.getExpression();
  if (root instanceof PropertyAccessExpression) {
    return getPropertyAccessRoot(root);
  }
  return root;
};

export const getFullPropertyAccessPathString = (
  node: PropertyAccessExpression
): string => {
  const root = getPropertyAccessRoot(node);
  const path = getPropertyAccessKeysPath(node);
  return `${root.getText()} <= ${path.join(' <= ')}`;
};

export const resolvePropertyAccessRootFully = (
  node: PropertyAccessExpression
): Node | void => {
  const root = getPropertyAccessRoot(node);
  if (root) return resolveReferenceFully(root);
};
