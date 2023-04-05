describe("GraphQL API", () => {
  it("Get the book by ID and verify response data", () => {
    const query = `
        query {
          book(id: 1) {
            id
            name
            author {
              name
            }
          }
        }
      `;

    cy.request({
      url: "/graphql",
      method: "POST",
      body: { query },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("book");
      expect(response.body.data.book).to.have.property("id", 1);
      expect(response.body.data.book).to.have.property(
        "name",
        "Harry Potter and the Chamber of Secrets"
      );
      expect(response.body.data.book).to.have.property("author");
      expect(response.body.data.book.author).to.have.property(
        "name",
        "J. K. Rowling"
      );
    });
  });

  it("Adds a new book", () => {
    // Prepare the mutation query
    const mutationQuery = `
      mutation {
        addBook(name: "The Test Book", authorId: 1) {
          id
          name
          authorId
        }
      }
    `;

    // Execute the mutation query
    cy.request({
      method: "POST",
      url: "/graphql", // Replace with the path to your GraphQL server
      body: { query: mutationQuery },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      // Validate the response
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("addBook");
      expect(response.body.data.addBook).to.have.property("id");
      expect(response.body.data.addBook).to.have.property(
        "name",
        "The Test Book"
      );
      expect(response.body.data.addBook).to.have.property("authorId", 1);

      // Validate the book was added to the data source
      // const addedBook = books.find(
      //   (book) => book.id === response.body.data.addBook.id
      // );
      // expect(addedBook).not.to.be.undefined;
      // expect(addedBook.name).to.equal("The Test Book");
      // expect(addedBook.authorId).to.equal(1);
    });
  });
});
