import { EditableColorCell, EditableDateCell, EditableEmailCell, EditableFileCell, EditableNumCell, EditablePasswordCell, EditableTextCell } from "./EditableCell"

export const ColumnHeader = (columnData,updateMyData) =>{
   return columnData.sort((a,b)=>a.orderNum-b.orderNum).map((res)=>{
        if(res.cellType=='text'){
            return {
                Header : res.Header,
                accessor : res.accessor,
                Cell :({cell}) =>{
                    return <EditableTextCell column={cell.column.id} row={cell.row.id} updateMyData={updateMyData} value={cell.value} />
                },
                sticky : res.sticky
            }
        }else if(res.cellType=='number'){
            return {
                Header : res.Header,
                accessor : res.accessor,
                Cell :({cell}) =>{
                    return <EditableNumCell column={cell.column.id} row={cell.row.id} updateMyData={updateMyData} value={cell.value} />
                },
                sticky : res.sticky
            }
        }else if(res.cellType=='date'){
            return {
                Header : res.Header,
                accessor : res.accessor,
                Cell :({cell}) =>{
                    return <EditableDateCell column={cell.column.id} row={cell.row.id} updateMyData={updateMyData} value={cell.value} />
                },
                sticky : res.sticky
            }
        }else if(res.cellType=='attach'){
            return {
                Header : res.Header,
                accessor : res.accessor,
                Cell :({cell}) =>{
                    return <EditableFileCell column={cell.column.id} row={cell.row.id} updateMyData={updateMyData} value={cell.value} />
                },
                sticky : res.sticky
            }
        }else if(res.cellType=='email'){
            return {
                Header : res.Header,
                accessor : res.accessor,
                Cell :({cell}) =>{
                    return <EditableEmailCell column={cell.column.id} row={cell.row.id} updateMyData={updateMyData} value={cell.value} />
                },
                sticky : res.sticky
            }
        }else if(res.cellType=='password'){
            return {
                Header : res.Header,
                accessor : res.accessor,
                Cell :({cell}) =>{
                    return <EditablePasswordCell column={cell.column.id} row={cell.row.id} updateMyData={updateMyData} value={cell.value} />
                },
                sticky : res.sticky
            }
        }else if(res.cellType=='color'){
            return {
                Header : res.Header,
                accessor : res.accessor,
                Cell :({cell}) =>{
                    return <EditableColorCell column={cell.column.id} row={cell.row.id} updateMyData={updateMyData} value={cell.value} />
                },
                sticky : res.sticky
            }
        }
        else{
            return {
                Header : res.Header,
                accessor : res.accessor,
                sticky : res.sticky
            }
        } 
    })
}