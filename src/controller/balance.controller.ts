import * as balanceService from '../services/balance.service';

export const addBalance = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const amount = req.body.amount;
    const response = await balanceService.addBalance(amount, userId);
    res.status(200).json({ data: response.updatedWallet });
  } catch (error) {
    next(error);
  }
};
