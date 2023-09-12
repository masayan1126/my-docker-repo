import express, { Request, Response } from "express";
import { CreateUserUseCase } from "../useCase/CreateUserUseCase";
import { PrismaClient } from "@prisma/client";
import { FindUserUseCase } from "../useCase/FindUserUseCase";

const router = express.Router();

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

/**
 * ユーザー新規作成
 */
router.post("", async (req: Request, res: Response) => {
  const { email, name } = req.body.data;

  const useCase = new CreateUserUseCase();
  const user = await useCase.create(name, email);

  return res.status(200).json({
    user,
  });
});

/**
 * ユーザー一覧取得
 */
router.get("", async (req: Request, res: Response) => {
  // T0D0: ユースケースに切り出す
  const users = await prisma.user.findMany();

  return res.status(200).json({
    users,
  });
});

/**
 * ユーザー取得
 */
router.get("/:id", async (req: Request, res: Response) => {
  const useCase = new FindUserUseCase();

  const user = await useCase.find(req.params.id);

  return res.status(200).json({
    user,
  });
});

/**
 * ユーザー更新
 */
router.patch("", async (req: Request, res: Response) => {
  const { id, email, name } = req.body.data;

  // T0D0: ユースケースに切り出す
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      name,
    },
  });

  return res.status(200).json({
    user,
  });
});

/**
 * ユーザー削除
 */
router.delete("", async (req: Request, res: Response) => {
  const { id } = req.body;

  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return res.status(200).json({
    user,
  });
});

export default router;
