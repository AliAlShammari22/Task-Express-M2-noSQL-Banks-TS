import { Request, Response } from "express";
import { accounts } from "../../account";
import Account from "../../models/Accounts";
import { console } from "inspector";

export const accountCreate = async (req: Request, res: Response) => {
  try {
    const { username, funds } = req.body;
    const newAccount = await Account.create({ username, funds });
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const accountDelete = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const deleteAccount = await Account.findByIdAndDelete(accountId);
    res.status(201).json(deleteAccount);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const accountUpdate = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const { username, funds } = req.body;
    const updateAccount = await Account.findByIdAndUpdate(accountId, {
      username,
      funds,
    });
    if (updateAccount) {
      res.json(updateAccount);
    } else {
      res.status(404).json("error");
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const accountsGet = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.find().select("-createdAt -updatedAt");
    res.json(accounts);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getAccountByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const finduserAccount = await Account.findOne({ username }).select(
      "-createdAt -updatedAt"
    );
    if (finduserAccount) {
      res.json(finduserAccount);
    } else {
      res.status(404).json("error");
    }
  } catch (error) {
    res.status(404).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
