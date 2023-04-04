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
    // expect no errors to be returned in the result
    expect(result.errors).toBeUndefined();
    //  expects the books field to be present / defined
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
    // expect no errors to be returned in the result
    expect(result.errors).toBeUndefined();
    // expects the author field to be present / defined
    expect(result.data.author).toBeDefined();
    // expects the returned author's id to be 1, as we queried for author with id 1
    expect(result.data.author.id).toEqual(1);
    //  expects the name field to be present / defined
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
    // expects errors to be returned in the result as there is no `nonExistentField` in the schema
    expect(result.errors).toBeDefined();
  });
});
