import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useGlobalFilter, useFilters, usePagination, useSortBy, useBlockLayout,useResizeColumns } from 'react-table'
import { useSticky } from 'react-table-sticky'
import GlobalFilter from './GlobalFilter'
import {ColumnFilter} from './ColumnFilter'
import { Styles } from './TableStyles'
import { ColumnHeader } from './ColumnHeader'
import { EditableAddRemoveCell } from './EditableCell'

const Table = ({columnData,tableData,tableHeight,tableWidth,isColumnFilter,isSorting,isPagination,bgColor,getTableData,getTableFileData, isMultiRow}) => {

    const [data,setdata] =  useState([...tableData])
    const [columns,setcolumns] = useState(
        isMultiRow ?
        [...ColumnHeader(columnData,updateMyData),
            {
                Header:'Action',
                accessor :'action',
                Cell :({cell})=>{
                    return <EditableAddRemoveCell handleRemove={handleRemove} column={cell.column.id} row={cell.row.id}/>
                },
                sticky :'right'
            }
        ]
         :
        [...ColumnHeader(columnData,updateMyData)]
        )

    const defaultColumn = useMemo(() => {
        if(isColumnFilter){
            return {
                Filter: ColumnFilter
            }
        }else{
            return {
                Filter :''
            }
        }
    }, [])

    function handleAdd(){
        const obj = {}
        columnData.forEach((res)=>{
            obj[res.accessor] =''
        })
        setdata((old)=>{return [...old,obj]})
    }

    function handleRemove(rowIndex){
        setdata((old)=>{
            return old.filter((fil,i)=>{
                return i !== Number(rowIndex)
            })
        })
    }

    const formData = new FormData()
    function updateMyData(rowIndex,columnId,value,fileData){

        if(fileData){
            formData.append('file',fileData)
            // formData is the final variable for fileData
          }

        setdata((old,i)=>{
            return old.map((res,index)=>{
                if(rowIndex==index){
                    return {...res,[columnId] : value}
                }else{
                    return res
                }
            })
        })
    }

    useEffect(()=>{
        if(getTableData){
            getTableData(data)
        }

        if(getTableFileData){
            getTableFileData(formData)
        }
    },[data])

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        //   footerGroups, 
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        state,
        gotoPage,
        setPageSize,
        pageCount,
        setGlobalFilter,
    } = useTable({
            columns,
            data,
            defaultColumn
        }, useFilters, useBlockLayout, useGlobalFilter, useSortBy, useSticky,usePagination,        useResizeColumns
        )

    const { globalFilter } = state
    const { pageIndex,pageSize } = state

    useEffect(()=>{
        setPageSize(isPagination ? 10 : data.length)
    },[data])
    
  return (
    <>
    <button style={{marginLeft:`${tableWidth-3}vw`, display : isMultiRow? 'block' :'none' }} onClick={handleAdd} className='btn btn-success'>Add</button>
    <Styles backgroundColor={bgColor}>
    <div {...getTableProps()} className="table sticky mx-3 my-1 tableCont " style={{ height:`${tableHeight}vh`,width:`${tableWidth}vw` ,overflow: 'scroll', border: 'none' }} >
                        <div className='header'>
                            {
                                headerGroups.map((headerGroup) => (
                                    <>
                                    
                                       <div className='tr' {...headerGroup.getHeaderGroupProps()}>
            {
                headerGroup.headers.map((column) => (
                    <div {...column.getHeaderProps( isSorting ? column.getSortByToggleProps() : '')} className="th">
                  <div >
                    
                  </div>
                  {column.render('Header')}
                  <div
                      {...column.getResizerProps()}
                      className={`resizer`}
                    />
                    {
                        isSorting ? 
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span> : <></>
                    }
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                </div>
                ))
            }
        </div>
                                    </>
                                ))
                            }
                        </div>
                        <div className='body' {...getTableBodyProps()}>
                            {
                                page.map((row) => {
                                    prepareRow(row)
                                    return <div className='tr' {...row.getRowProps()}>
                                        {
                                            row.cells.map((cell) => (
                                                <div className='td' {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </div>
                                            ))
                                        }
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    </Styles>
                    {
                        isPagination ?

                    <div style={{display:'flex', justifyContent:'center', marginTop:'1vw', gap:'10px',alignItems:'center' }} >
        <span >
            page: {' '}
            <strong>
                { pageIndex + 1} of { pageOptions.length }
            </strong>{' | '}
            Go To Page <input type='number' min={0} defaultValue={pageIndex -1} onChange={
                (e)=>{
                    const PageNumber = e.target.value ? Number(e.target.value) -1 : 0
                    gotoPage(PageNumber)
                }
            }></input>
        </span>
        <button className='btn btn-outline-secondary btn-sm ' title='First page' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button className='btn btn-outline-secondary btn-sm ' title='Previous page' onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
        <button className='btn btn-outline-secondary btn-sm' title='Next page' onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        <button className='btn btn-outline-secondary btn-sm' title='Last page' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
    </div> :<></>
                    }
    </>
  )
}

export default Table