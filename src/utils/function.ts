import {
  SyntaxKind,
  Identifier,
  PropertyAccessExpression,
  ArrowFunction,
  FunctionDeclaration,
  MethodDeclaration,
  ConstructorDeclaration,
  VariableDeclaration,
  CallExpression,
} from "ts-morph";

import { getNodeContext } from "./context";
import {} from "./path";
import { getFullNodeName } from "./name";

const CALLER_KINDS = [
  FunctionDeclaration,
  ArrowFunction,
  MethodDeclaration,
  ConstructorDeclaration,
] as const;

export const getFunctionCallers = (
  functionDeclaration: FunctionDeclaration | VariableDeclaration
): (
  | FunctionDeclaration
  | ArrowFunction
  | MethodDeclaration
  | ConstructorDeclaration
)[] => {
  const refs = functionDeclaration.findReferencesAsNodes();

  const callers = refs
    .map((ref) => {
      console.log("-----------------");
      // passed in as a parameter
      if (
        ref.getParent().getKind() === SyntaxKind.CallExpression &&
        (ref.getParent() as CallExpression).getArguments().includes(ref)
      ) {
        const caller = (ref.getParent() as CallExpression).getExpression();
        // console.log("Callback");
        if (caller instanceof PropertyAccessExpression) {
          console.log("PropertyAccessExpression");

          try {
            const definitionNodes = caller.getNameNode().getDefinitionNodes();
            console.log("Definition");
            // const container = getFirstPropertyAccessExpressionContainer(caller);
            // console.log("container", getFullNodeName(container));
          } catch (e) {
            console.log("No definition", e.message);
            // no definition, outside or internal function
            console.log(caller.getText());
          }
        } else if (caller instanceof Identifier) {
          console.log("Identifier");

          try {
            const definitionNodes = caller.getDefinitionNodes();
            console.log("Definition");
            console.log(definitionNodes.map(getFullNodeName));
          } catch {
            console.log("No definition");

            // no definition, outside or internal function
            console.log(caller.getText());
          }

          return undefined;
        }
        return undefined;
      }
      const firstFunctionParent = getNodeContext(ref);

      console.log("-----------------");
      if (!CALLER_KINDS.find((kind) => firstFunctionParent instanceof kind))
        return undefined;

      return firstFunctionParent;
    })
    .filter(Boolean);
  return callers as FunctionDeclaration[];
};
