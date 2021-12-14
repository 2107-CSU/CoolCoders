
const { createCategory, getCategoryById } = require('../db/categories');

describe("Database", () => {
  beforeAll(() => {
    return rebuildDB();
  });
  afterAll(() => {
    return client.end();
  });
  describe("Categories", () => {
    let categoryToCreate, queriedCategory;
    // let userCredentials = {
    //   email: "example@example.com",
    //   name: "Test Jones",
    //   password: "test1234",
    // };
    let testCategoryDetails = {
        name: 'My First Test'
    }
    // describe("createCategory", () => {
      beforeAll(async () => {
        categoryToCreate = await createCategory(testCategoryDetails);
        const {
          rows: [testCategory],
        } = await client.query(
          `
          SELECT * FROM categories WHERE name=$1;
        `,
          [categoryToCreate.name]
        );
        queriedCategory = testCategory;
      });
      it("Creates the category", async () => {
        expect(categoryToCreate.name).toBe(testCategoryDetails.name);
        expect(queriedCategory.name).toBe(testCategoryDetails.name);
      });
    });
    describe("getCategoryById", () => {
      it("Gets a category based on passed in ID", async () => {
        const category = await getCategoryById(categoryToCreate.id);
        expect(category).toBeTruthy();
        expect(category.id).toBe(categoryToCreate.id);
      });
    });
  });
