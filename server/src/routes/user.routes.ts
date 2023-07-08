import { Router, Request, Response } from "express";
import userService from "../service/user-service";
import orderService from "../service/order-service";
const router = Router();

module.exports = router;

router.get("/getUserData", async (req: Request, res: Response) => {
  try {
    const userData = await userService.getUserFromId(req.query.id as string);
    const resData = {
      name: userData.name,
      phone: userData.phone,
      vk: userData.vk || "",
      telegram: userData.telegram || "",
      email: userData.email,
    };
    return res.status(200).json(resData);
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: e.message || "Что-то пошло не так!" });
  }
});

router.get("/getUserOrders", async (req: Request, res: Response) => {
  try {
    const userOrders = await orderService.getUserOrders(req.query.id as string);
    return res.status(200).json(userOrders);
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: e.message || "Что-то пошло не так!" });
  }
});

router.patch("/changeUserPersonalData", async (req: Request, res: Response) => {
  try {
    await userService.changeUserPersonalData(req.body);
    return res.status(200).json({ message: "Данные успешно изменены!" });
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: e.message || "Что-то пошло не так!" });
  }
});

router.patch("/changeUserPassword", async (req: Request, res: Response) => {
  try {
    await userService.changeUserPassword(
      req.body.id,
      req.body.password,
      req.body.newPassword
    );
    return res.status(200).json({ message: "Пароль успешно изменен!" });
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: e.message || "Что-то пошло не так!" });
  }
});
