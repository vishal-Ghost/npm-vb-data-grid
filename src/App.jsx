import React from 'react'
import Table from './Table/Table'
import {Columns} from '../src/Table/Columns'
import MOCK_DATA from '../src/Table/MOCK_DATA_TAB.json'

const App = () => {
const handleChange = (val) =>{
  console.log('data',val)
}

const handleFIleData = (val) =>{
console.log('file',val)
}
  return (
    <>
    <Table 
    columnData={Columns} 
    tableData={MOCK_DATA} 
    tableHeight={'90'}
    tableWidth={'77'}
    isColumnFilter={false}
    isSorting={false}
    isPagination={false}
    isMultiRow={false}
    bgColor={'red'}
    getTableData={handleChange}
    getTableFileData={handleFIleData}
     />
    </>
  )
}

export default App