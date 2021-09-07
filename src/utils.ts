import { IRow, ISortOrder } from "./interfaces"
import { assetClassSortOrder } from './constants'

export const comparatorPrice = (a:IRow, b:IRow):number => {
    return a.price - b.price
  }

export const comparatorTicker = (a:IRow, b:IRow):number => {
  const tickerA = a.ticker.toUpperCase(); // ignore upper and lowercase
  const tickerB = b.ticker.toUpperCase(); // ignore upper and lowercase
  return tickerA < tickerB ? -1 : 1 
}

export const comparatorAsset = (a:IRow, b:IRow):number => {
  const assetSortOrder: Array<ISortOrder> = assetClassSortOrder as Array<ISortOrder>

  const assetClassA = a.assetClass.toLowerCase(); 
  const assetClassB = b.assetClass.toLowerCase();
  const assetSortOrderA = assetSortOrder.find((order:ISortOrder) => order.name === assetClassA)
  const assetSortOrderB = assetSortOrder.find((order:ISortOrder) => order.name === assetClassB)
  const orderA = assetSortOrderA ? assetSortOrderA['order'] : 0
  const orderB = assetSortOrderB ? assetSortOrderB['order'] : 0
  return orderA < orderB ? -1 : 1 
}

  