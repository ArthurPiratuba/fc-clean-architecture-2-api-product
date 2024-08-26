import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const input = {
      name: "Barril de Chopp 50l",
      price: 550.50
    };
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    const output = await productCreateUseCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });

  it("should thrown an error when name is missing", async () => {
    const input = {
      name: "",
      price: 100
    };
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should thrown an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    const input = {
      name: "Barril de Chopp 50l",
      price: -1
    };
    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Price must be zero or greater than zero"
    );
  });
});
