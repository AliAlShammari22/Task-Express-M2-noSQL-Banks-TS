import { Request, Response } from "express";
import { accounts } from "../../account";
import Account from "../../models/Accounts";
import { console } from "inspector";

export const accountCreate = async (req: Request, res: Response) => {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const accountDelete = (req: Request, res: Response) => {
  const { accountId } = req.params;
  const foundAccount = accounts.find((account) => account.id === +accountId);
  if (foundAccount) {
    let newAccounts = accounts.filter((account) => account.id !== +accountId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};

export const accountUpdate = (req: Request, res: Response) => {
  const { accountId } = req.params;
  const foundAccount = accounts.find((account) => account.id === +accountId);
  if (foundAccount) {
    foundAccount.funds = req.body.funds;
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};

export const accountsGet = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getAccountByUsername = (req: Request, res: Response) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd" && foundAccount) {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  } else {
    res.status(201).json(foundAccount);
  }
};
