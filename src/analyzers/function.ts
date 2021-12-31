import { SourceFile } from "ts-morph";

import { getFunctionCallers } from "../utils/function";
import { getFullMeaningfulNodeName } from "../utils/name";

const analyzeFunctions = (sourceFile: SourceFile): void => {
  const functions = sourceFile.getFunctions();

  for (const functionDeclaration of functions) {
    const name = functionDeclaration.getName();
    console.log("-----------------------------------");
    console.log(`Function: ${name}`);

    const callers = getFunctionCallers(functionDeclaration);

    for (const caller of callers) {
      const callerName = getFullMeaningfulNodeName(caller);
      console.log(`Caller: ${callerName}`);
    }

    // const callExpressions = functionDeclaration.getDescendantsOfKind(
    //   SyntaxKind.CallExpression
    // );

    // for (const callExpression of callExpressions) {
    //   const caller = callExpression.getExpression();
    //   console.log(`Caller: ${caller.getText()}, ${caller.getKindName()}`);
    // }

    console.log("-----------------------------------");
    // const statements = functionDeclaration.getStatements();

    // for (const statement of statements) {
    //   console.log(`Statement: ${statement.getKindName()}`);
    // }
  }
};
