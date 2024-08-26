
import express, { Request, Response, Router } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export default class ProductRouter {
    private productRoute: Router = express.Router();

    constructor(repository: ProductRepository) {

        this.productRoute.post("/", async (req: Request, res: Response) => {
            const createProduct = new CreateProductUseCase(repository);
            try {
                const output = await createProduct.execute(req.body);
                res.send(output);
            } catch (error) {
                res.status(500).send(error);
            }
        });

        this.productRoute.get("/", async (req: Request, res: Response) => {
            const listProducts = new ListProductUseCase(repository);
            try {
                const output = await listProducts.execute({});
                res.send(output);
            } catch (error) {
                res.status(500).send(error);
            }
        });
    }

    getRouter(): Router {
        return this.productRoute;
    }
}
