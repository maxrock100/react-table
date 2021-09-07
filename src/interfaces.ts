export interface IRow extends Record<string, any> {
    'ticker':string, 'price': number,'assetClass': string
  }

export interface IColumn {key: string, displayName: string, render?: Function}

export interface ISortOrder{name:string, order:number}

export type CompareFunction = (a: IRow,b:IRow) => number; 

export interface ISortingOption{value: string, comparator?: CompareFunction, displayText: string}