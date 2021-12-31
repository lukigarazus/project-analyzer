import { SourceFile } from "ts-morph";

export const handleClasses = (sourceFile: SourceFile) => {
  const classes = sourceFile.getClasses();
  for (const classDeclaration of classes) {
    const name = classDeclaration.getName();
    console.log(`Class: ${name}`);
    const properties = classDeclaration.getProperties();

    for (const property of properties) {
      const name = property.getName();
      const type = property.getType();
      console.log(`Property: ${name}`);
      console.log(`Type: ${type}`);
    }

    const methods = classDeclaration.getMethods();

    for (const method of methods) {
      const name = method.getName();
      const type = method.getType();
      console.log(`Method: ${name}`);
      console.log(`Type: ${type}`);
    }
  }
};
