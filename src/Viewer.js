import React, {useState, useEffect, Fragment} from 'react'

import axios from 'axios'
import uuid from 'react-uuid'
import FloatMessage from './Component/FloatMessage'


function Viewer({currentNote: {date, text}}) {
    const [wordsArray, setWordsArray] = useState([]) 
    const [wordData, setWordData] = useState([])
    const [showMeaning, setShowMeaning] = useState(false)
    const [isLoading, setLoading] = useState(true)

    const fetchDefinition = word => {
        const temp = word.toLowerCase()
        let w = '';
        [...temp].forEach((letter) => {
            if(/[a-z]/.test(letter)){
                w += letter
            }
        })

        setShowMeaning(true)
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`)
        .then(response => {
            if(response.status === 200){
                setWordData(response.data[0])
                setLoading(false)
                setShowMeaning(true)
            }
        })
        .catch(err => {
            setLoading(false);
            setWordData({"title":"No Definitions Found", "resolution":"You can try the search again at later time or head to the web instead."})
            // console.log(err)
        })
        setLoading(true)
    }

    useEffect(() => {
        setWordsArray(text.split(' '))
    }, []);

    const displayWords = () => {
        return wordsArray.map(word => <Fragment key={uuid()}> <span onClick={() => fetchDefinition(word)}>{word}</span> </Fragment>)
    }

    const setShowMessage = React.useCallback((val) => {
        setShowMeaning(val)
    }, [setShowMeaning])

    return (
        <div className="viewer-container">
            {showMeaning && <FloatMessage wordData={wordData} setWordData={setWordData} setShowMessage={setShowMessage} isLoading={isLoading}/>}
            <div className="date"> <span>{date}</span> </div>
            <pre className="text scroll">
                {displayWords()}
            </pre>
        </div>
    )
}

export default Viewer
