import { useState, ChangeEvent } from 'react';
import './App.css';
import {data} from './constants'
import {IColumn, IRow, ISortingOption} from './interfaces'
import{comparatorPrice, comparatorTicker, comparatorAsset} from './utils'

const rowData: Array<IRow> = data as Array<IRow>

const sortingOptions: Array<ISortingOption> = [
  {
    'value':'',
    'displayText':'Select'
  }, 
  {
    'value':'Asset',
    'comparator': comparatorAsset,
    'displayText':'Asset'
  }, 
  {
    'value':'Price',
    'comparator': comparatorPrice,
    'displayText':'Price'
  },
  {
    'value': 'Ticker',
    'comparator': comparatorTicker,
    'displayText': 'Ticker'
  }
]

const rowColourSchema: Array<{type: string,color:string}> = [
  { type: 'Macro',
    color:'white'
  },
  {
    type: 'Equities',
    color:'blue'
  },
  {
    type: 'Credit',
    color:'green'
  }
];

const columns: Array<IColumn> = [
  {
    key:'ticker',
    displayName:'Ticker'
},{
    key:'price',
    displayName:'Price',
    render: (value:number):any =>(<div style={{color: value > 0 ? 'yellow' : 'red'}}>{value}</div>)
  },{
    key:'assetClass',
    displayName:'AssetClass',
  }
]

function App() {
const [sortType, setSortType] = useState('')

const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
  setSortType(event.target.value)
}

const getAssetStyleClass = (assetClassName: string) : string => {
  const selectedElement = rowColourSchema.find(item=> item.type.toLowerCase() === assetClassName.toLowerCase())
  return selectedElement ? selectedElement.color : '';
}

const sortData = (data:Array<IRow>):Array<IRow> => {
  const currentSort = sortingOptions.find((option: ISortingOption)=> option.value.toLowerCase() === sortType.toLowerCase() )
  return currentSort && currentSort.comparator ? data.slice().sort(currentSort.comparator) : data
}

  return (
    <div className='app'>
      <div className='sort-control'><span>Sort Type: </span>

        <select onChange={handleSortChange} value={sortType}>
          {sortingOptions.map(sortingOption=><option value={sortingOption.value}>{sortingOption.displayText}</option>)}
        </select>
      </div>
      <div className='table'>
        <div className='table__header'>
          {
            columns.map(column=> <div key={column.key} className='column'>{column.displayName}</div>)
          }
        </div>
        <div className='table__rows'>
          {
            sortData(rowData).map((row:IRow)=>(<div className='row' style={{backgroundColor: getAssetStyleClass(row.assetClass)}}>
              {
                columns.map(column=>(
                  <div className='column'>
                    {column.render ? column.render(row[column.key]) : <span>{row[column.key]}</span>}
                  </div>
                ))
              }
            </div>))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
