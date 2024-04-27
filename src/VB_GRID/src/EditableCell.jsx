import { useEffect, useState } from "react"

export const EditableTextCell = ({
    value : initialValue,
    updateMyData,
    row:  index ,
    column:  id ,
}) =>{

    const[value,setvalue] = useState(initialValue)

    const handleChange = (e) =>{
        setvalue(e.target.value)
    }

    const handleBlur = () =>{
        updateMyData(index,id,value)
    }

    useEffect(()=>{
        setvalue(initialValue)
    },[initialValue])

    return <>
    <textarea className="form-control" value={value} onChange={handleChange} onBlur={handleBlur}/>
    </>
}

export const EditableNumCell = ({
    value : initialValue,
    updateMyData,
    row:  index ,
    column:  id ,
}) =>{

    const[value,setvalue] = useState(initialValue)

    const handleChange = (e) =>{
        setvalue(e.target.value)
    }

    const handleBlur = () =>{
        updateMyData(index,id,value)
    }

    useEffect(()=>{
        setvalue(initialValue)
    },[initialValue])

    return <>
    <input className="form-control" type="number" value={value} onChange={handleChange} onBlur={handleBlur}/>
    </>
}


export const EditableDateCell = ({
    value : initialValue,
    updateMyData,
    row:  index ,
    column:  id ,
}) =>{

    const[value,setvalue] = useState(initialValue)

    const handleChange = (e) =>{
        setvalue(e.target.value)
    }

    const handleBlur = () =>{
        updateMyData(index,id,value)
    }

    useEffect(()=>{
        setvalue(initialValue)
    },[initialValue])

    return <>
    <input className="form-control" type="date" value={value} onChange={handleChange} onBlur={handleBlur}/>
    </>
}

export const EditableFileCell = ({
    value : initialValue,
    updateMyData,
    row:  index ,
    column:  id ,
}) =>{

    const[value,setvalue] = useState(initialValue)

    const handleChange = (e) =>{
        let date =  Date.now()
        const modifiedFile = new File([e.target.files[0]],e.target.files[0].name.replace('.',date+'.'))
        setvalue(modifiedFile.name)
        updateMyData(index,id,modifiedFile.name,modifiedFile)
    }


    const handleRemove = () =>{
        updateMyData(index,id,'')

    }

    useEffect(()=>{
        setvalue(initialValue)
    },[initialValue])

    return <>{
        value ?<>
        <label htmlFor="removeBtn">{value}</label><br/>
        <button id="removeBtn" className="btn btn-danger" onClick={handleRemove}>Remove</button>
        </> :
        <input className="form-control" type="file" value={value} onChange={handleChange}/>

    }
    </>
}

export const EditableEmailCell = ({
    value : initialValue,
    updateMyData,
    row:  index ,
    column:  id ,
}) =>{

    const[value,setvalue] = useState(initialValue)

    const handleChange = (e) =>{
        setvalue(e.target.value)
    }

    const handleBlur = () =>{
        updateMyData(index,id,value)
    }

    useEffect(()=>{
        setvalue(initialValue)
    },[initialValue])

    return <>
    <input className="form-control" type="email" value={value} onChange={handleChange} onBlur={handleBlur}/>
    </>
}

export const EditableColorCell = ({
    value : initialValue,
    updateMyData,
    row:  index ,
    column:  id ,
}) =>{

    const[value,setvalue] = useState(initialValue)

    const handleChange = (e) =>{
        setvalue(e.target.value)
    }

    const handleBlur = () =>{
        updateMyData(index,id,value)
    }

    useEffect(()=>{
        setvalue(initialValue)
    },[initialValue])

    return <>
    <input  type="color" className="form-control" value={value} onChange={handleChange} onBlur={handleBlur}/>
    </>
}

export const EditablePasswordCell = ({
    value : initialValue,
    updateMyData,
    row:  index ,
    column:  id ,
}) =>{

    const[value,setvalue] = useState(initialValue)

    const handleChange = (e) =>{
        setvalue(e.target.value)
    }

    const handleBlur = () =>{
        updateMyData(index,id,value)
    }

    useEffect(()=>{
        setvalue(initialValue)
    },[initialValue])

    return <>
    <input className="form-control" type="password" value={value} onChange={handleChange} onBlur={handleBlur}/>
    </>
}


export const EditableAddRemoveCell = ({
    row:  index ,
    column:  id ,
    handleRemove
}) =>{


    return <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
    <button className="btn btn-danger" onClick={()=>{handleRemove(index)}}>Remove</button>
    </div>
}