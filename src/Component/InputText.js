import React, {useEffect, useRef} from 'react'

function InputText({query, setQuery}) {

    const ref = useRef()
    useEffect(() => {
        ref.current.focus()
    }, [])

    return (<input ref={ref} type="text" className="search-input" value={query} onChange={e => setQuery(e.target.value)}/>)
}

export default InputText
