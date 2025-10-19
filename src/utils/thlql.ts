import { parser } from "@/instances/lezer";
import { PrismaClient } from "@prisma/client";
import { Tree } from "@lezer/common";

interface QueryNode {
  type: "or" | "and" | "comparison";
  left?: QueryNode;
  right?: QueryNode;
  field?: string;
  operator?: string;
  value?: string;
}

export class ThlqlToPrismaWhere {
  /**
   * Converts a THLQL query string to a Prisma where clause
   * @param thlqlQuery - The THLQL query string
   * @returns Prisma where clause object that you can use in your queries
   */
  convert(thlqlQuery: string): any {
    if (!thlqlQuery || thlqlQuery.trim() === "") {
      return {};
    }

    // Parse THLQL query
    const tree = parser.parse(thlqlQuery);
    if (tree.type.isError) {
      throw new Error("Invalid THLQL query");
    }

    // Convert to AST
    const ast = this.treeToAST(tree, thlqlQuery);

    // Convert to Prisma where clause
    return this.astToPrismaWhere(ast);
  }

  private treeToAST(tree: any, input: string): QueryNode {
    return this.nodeToAST(tree.cursor(), input);
  }

  private nodeToAST(cursor: any, input: string): QueryNode {
    const nodeType = cursor.type.name;

    switch (nodeType) {
      case "Query":
        cursor.firstChild();
        const result = this.nodeToAST(cursor, input);
        cursor.parent();
        return result;

      case "OrExpression":
        return this.parseBinaryExpression(cursor, input, "or");

      case "AndExpression":
        return this.parseBinaryExpression(cursor, input, "and");

      case "Term":
        cursor.firstChild();
        const termResult = this.nodeToAST(cursor, input);
        cursor.parent();
        return termResult;

      case "ParenthesizedExpression":
        cursor.firstChild(); // Skip '('
        cursor.nextSibling(); // Go to expression
        const exprResult = this.nodeToAST(cursor, input);
        cursor.parent();
        return exprResult;

      case "Comparison":
        return this.parseComparison(cursor, input);

      default:
        throw new Error(`Unknown node type: ${nodeType}`);
    }
  }

  private parseBinaryExpression(
    cursor: any,
    input: string,
    operator: "or" | "and",
  ): QueryNode {
    const children: QueryNode[] = [];

    if (cursor.firstChild()) {
      do {
        const childType = cursor.type.name;
        if (childType !== operator) {
          children.push(this.nodeToAST(cursor, input));
        }
      } while (cursor.nextSibling());
      cursor.parent();
    }

    if (children.length === 1) {
      return children[0];
    }

    let result = children[0];
    for (let i = 1; i < children.length; i++) {
      result = {
        type: operator,
        left: result,
        right: children[i],
      };
    }

    return result;
  }

  private parseComparison(cursor: any, input: string): QueryNode {
    let field = "";
    let operator = "";
    let value = "";

    if (cursor.firstChild()) {
      do {
        const childType = cursor.type.name;
        const childText = input.slice(cursor.from, cursor.to);

        switch (childType) {
          case "Field":
            field = childText;
            break;
          case "Operator":
            operator = childText;
            break;
          case "Value":
            value = this.extractValue(cursor, input);
            break;
        }
      } while (cursor.nextSibling());
      cursor.parent();
    }

    return {
      type: "comparison",
      field,
      operator,
      value,
    };
  }

  private extractValue(cursor: any, input: string): string {
    const valueText = input.slice(cursor.from, cursor.to);

    if (valueText.startsWith('"') && valueText.endsWith('"')) {
      return valueText.slice(1, -1);
    }

    return valueText;
  }

  private astToPrismaWhere(ast: QueryNode): any {
    switch (ast.type) {
      case "or":
        return {
          OR: [
            this.astToPrismaWhere(ast.left!),
            this.astToPrismaWhere(ast.right!),
          ],
        };

      case "and":
        return {
          AND: [
            this.astToPrismaWhere(ast.left!),
            this.astToPrismaWhere(ast.right!),
          ],
        };

      case "comparison":
        return this.comparisonToPrismaWhere(
          ast.field!,
          ast.operator!,
          ast.value!,
        );

      default:
        throw new Error(`Unknown AST node type: ${ast.type}`);
    }
  }

  private comparisonToPrismaWhere(
    field: string,
    operator: string,
    value: string,
  ): any {
    switch (field) {
      case "id":
        return this.handleNumericField("id", operator, parseInt(value));
      case "date":
        return this.handleDateField(operator, value);
      case "time":
        return this.handleNumericField("time", operator, parseInt(value));
      case "type":
        return this.handleStringField("type", operator, value);
      case "title":
        return this.handleStringField("title", operator, value);
      case "author":
        return this.handleAuthorField(operator, value);
      case "tag":
        return this.handleTagField(operator, value);
      default:
        throw new Error(`Unknown field: ${field}`);
    }
  }

  private handleNumericField(
    fieldName: string,
    operator: string,
    value: number,
  ): any {
    switch (operator) {
      case "eq":
        return { [fieldName]: value };
      case "ne":
        return { [fieldName]: { not: value } };
      case "gt":
        return { [fieldName]: { gt: value } };
      case "gte":
        return { [fieldName]: { gte: value } };
      case "lt":
        return { [fieldName]: { lt: value } };
      case "lte":
        return { [fieldName]: { lte: value } };
      default:
        throw new Error(
          `Invalid operator ${operator} for numeric field ${fieldName}`,
        );
    }
  }

  private handleStringField(
    fieldName: string,
    operator: string,
    value: string,
  ): any {
    switch (operator) {
      case "eq":
        return { [fieldName]: value };
      case "ne":
        return { [fieldName]: { not: value } };
      case "cont":
        return { [fieldName]: { contains: value } };
      case "ncont":
        return { [fieldName]: { not: { contains: value } } };
      default:
        throw new Error(
          `Invalid operator ${operator} for string field ${fieldName}`,
        );
    }
  }

  private handleDateField(operator: string, value: string): any {
    const date = this.parseDate(value);

    switch (operator) {
      case "eq":
        return this.getDateEqualityFilter(value);
      case "ne":
        return { date: { not: date } };
      case "gt":
        return { date: { gt: date } };
      case "gte":
        return { date: { gte: date } };
      case "lt":
        return { date: { lt: date } };
      case "lte":
        return { date: { lte: date } };
      default:
        throw new Error(`Invalid operator ${operator} for date field`);
    }
  }

  private getDateEqualityFilter(value: string): any {
    if (value.match(/^\d{4}$/)) {
      // Year only
      return {
        date: {
          gte: new Date(`${value}-01-01T00:00:00Z`),
          lt: new Date(`${parseInt(value) + 1}-01-01T00:00:00Z`),
        },
      };
    } else if (value.match(/^\d{4}-\d{2}$/)) {
      // Year-month
      const [year, month] = value.split("-").map(Number);
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      return {
        date: {
          gte: new Date(
            `${year}-${month.toString().padStart(2, "0")}-01T00:00:00Z`,
          ),
          lt: new Date(
            `${nextYear}-${nextMonth.toString().padStart(2, "0")}-01T00:00:00Z`,
          ),
        },
      };
    } else {
      // Full date
      return {
        date: {
          gte: new Date(`${value}T00:00:00Z`),
          lt: new Date(`${value}T23:59:59.999Z`),
        },
      };
    }
  }

  private handleAuthorField(operator: string, value: string): any {
    const authorCondition = this.handleStringField("name", operator, value);
    return {
      authors: {
        some: authorCondition,
      },
    };
  }

  private handleTagField(operator: string, value: string): any {
    const tagCondition = this.handleStringField("name", operator, value);
    return {
      tags: {
        some: tagCondition,
      },
    };
  }

  private parseDate(dateStr: string): Date {
    if (dateStr.match(/^\d{4}$/)) {
      return new Date(`${dateStr}-01-01T00:00:00Z`);
    } else if (dateStr.match(/^\d{4}-\d{2}$/)) {
      return new Date(`${dateStr}-01T00:00:00Z`);
    } else {
      return new Date(`${dateStr}T00:00:00Z`);
    }
  }
}
