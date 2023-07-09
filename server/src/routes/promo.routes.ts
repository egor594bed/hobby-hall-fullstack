import { Router, Request, Response } from "express";
import PromoService from "../service/promo-service";
const router = Router();

module.exports = router;

router.get("/getSwiperSrcs", async (req: Request, res: Response) => {
  try {
    const srcsArr = await PromoService.getSlidersSrcs();
    return res.status(200).json(srcsArr);
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: e.message || "Что-то пошло не так!" });
  }
});
