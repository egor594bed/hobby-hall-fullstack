import { Router, Request, Response } from "express";
import CatalogService from "../service/catalog-service";

const router = Router();

router.get("/getCatalog", async (req: Request, res: Response) => {
  try {
    const catalog = await CatalogService.getCatalog();
    return res.status(200).json({ catalog });
  } catch (e) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getGoodsFromId", async (req: Request, res: Response) => {
  try {
    const goodsArr = await CatalogService.getGoodsFromId(
      req.query.id as string
    );
    return res.status(200).json({ goodsArr });
  } catch (e) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getRecommendedItems", async (req: Request, res: Response) => {
  try {
    const goodsArr = await CatalogService.getRecommendedItems();
    return res.status(200).json({ goodsArr });
  } catch (e) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getGoodsFromSearch", async (req: Request, res: Response) => {
  try {
    const goodsArr = await CatalogService.getGoodsFromSearch(
      req.query.search as string
    );
    return res.status(200).json({ goodsArr });
  } catch (e) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getProduct", async (req: Request, res: Response) => {
  try {
    const product = await CatalogService.getProduct(req.query.id as string);
    return res.status(200).json({ product });
  } catch (e) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.post("/getBasketGoods", async (req: Request, res: Response) => {
  try {
    let basketArr = await CatalogService.getBasketGoods(req.body);
    return res.status(200).json({ basketArr });
  } catch (e) {
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
