import { StockHoldingInterface } from "../types";

/**
 * Calculates the current value of a stock holding.
 * @param {StockHoldingInterface} item - The stock holding item.
 * @returns {number} The current value of the stock holding.
 */
export function getCurrentValue(item: StockHoldingInterface) {
  return parseFloat((item.ltp * item.quantity).toFixed(2));
}

/**
 * Calculates the investment value of a stock holding.
 * @param {StockHoldingInterface} item - The stock holding item.
 * @returns {number} The investment value of the stock holding.
 */
export function getInvestmentValue(item: StockHoldingInterface) {
  return item.avgPrice * item.quantity;
}

/**
 * Calculates the profit or loss of a stock holding.
 * @param {StockHoldingInterface} item - The stock holding item.
 * @returns {number} The profit or loss of the stock holding.
 */
export function getProfitLoss(item: StockHoldingInterface) {
  return getCurrentValue(item) - getInvestmentValue(item);
}

/**
 * Calculates the total current value of multiple stock holdings.
 * @param {StockHoldingInterface[]} data - An array of stock holding items.
 * @returns {number} The total current value of the stock holdings.
 */
export function getTotalCurrentValue(data: StockHoldingInterface[]) {
  return data.reduce((acc, item) => acc + getCurrentValue(item), 0);
}

/**
 * Calculates the total investment value of multiple stock holdings.
 * @param {StockHoldingInterface[]} data - An array of stock holding items.
 * @returns {number} The total investment value of the stock holdings.
 */
export function getTotalInvestmentValue(data: StockHoldingInterface[]) {
  return data.reduce((acc, item) => acc + getInvestmentValue(item), 0);
}

/**
 * Calculates the total profit or loss of multiple stock holdings.
 * @param {StockHoldingInterface[]} data - An array of stock holding items.
 * @returns {number} The total profit or loss of the stock holdings.
 */
export function getTotalProfitLoss(data: StockHoldingInterface[]) {
  return getTotalCurrentValue(data) - getTotalInvestmentValue(data);
}

/**
 * Calculates today's profit or loss of multiple stock holdings.
 * @param {StockHoldingInterface[]} data - An array of stock holding items.
 * @returns {number} Today's profit or loss of the stock holdings.
 */
export function getTodaysProfitLoss(data: StockHoldingInterface[]) {
  return data.reduce((acc, item) => acc + (item.close - item.ltp) * item.quantity, 0);
}