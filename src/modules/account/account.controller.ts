import { Request, Response } from "express";

import { getAuthUser } from "@utils/auth";
import { apiSuccess, apiError } from "@utils/apiResponse";

import { getAccountDetails } from "./account.service";

export const getAccountController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const authUser =
        getAuthUser(req);

      const account =
        await getAccountDetails(
          authUser.userId
        );

      return apiSuccess(
        res,
        200,
        "Account details fetched successfully",
        account
      );

    } catch (error) {

      return apiError(
        res,
        404,
        error instanceof Error
          ? error.message
          : "Account not found"
      );
    }
};
