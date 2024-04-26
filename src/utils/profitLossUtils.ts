import { StockHoldingInterface } from "../types";

export function getCurrentValue(item: StockHoldingInterface) {
  return parseFloat((item.ltp * item.quantity).toFixed(2));
}

export function getInvestmentValue(item: StockHoldingInterface) {
  return item.avgPrice * item.quantity;
}

export function getProfitLoss(item: StockHoldingInterface) {
  return getCurrentValue(item) - getInvestmentValue(item);
}

export function getTotalCurrentValue(data: StockHoldingInterface[]) {
  return data.reduce((acc, item) => acc + getCurrentValue(item), 0);
}

export function getTotalInvestmentValue(data: StockHoldingInterface[]) {
  return data.reduce((acc, item) => acc + getInvestmentValue(item), 0);
}

export function getTotalProfitLoss(data: StockHoldingInterface[]) {
  return getTotalCurrentValue(data) - getTotalInvestmentValue(data);
}

export function getTodaysProfitLoss(data: StockHoldingInterface[]) {
  return data.reduce((acc, item) => acc + (item.close - item.ltp) * item.quantity, 0);
}