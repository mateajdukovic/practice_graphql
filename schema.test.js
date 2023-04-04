const EasyGraphQLTester = require("easygraphql-tester");
const { schema } = require("./schema");

describe("Test GraphQL Schema with Jest", () => {
  let tester;

  beforeEach(() => {
    tester = new EasyGraphQLTester(schema);
  });

  it("Should return a list of books", () => {
    const query = `
      {
        books {
          id
          name
          author {
            id
            name
          }
        }
      }
    `;
    const result = tester.graphql(query);
    expect(result.errors).toBeUndefined();
    expect(result.data.books).toBeDefined();
  });

  it("Should return a single author", () => {
    const query = `
      {
        author(id: 1) {
          id
          name
        }
      }
    `;
    const result = tester.graphql(query);
    expect(result.errors).toBeUndefined();
    expect(result.data.author).toBeDefined();
    expect(result.data.author.id).toEqual(1);
    expect(result.data.author.name).toBeDefined();
  });

  it("Should return an error for an invalid query", () => {
    const query = `
      {
        books {
          id
          name
          nonExistentField
        }
      }
    `;
    const result = tester.graphql(query);
    expect(result.errors).toBeDefined();
  });
});
