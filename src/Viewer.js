import React, {useState, useEffect, Fragment} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import axios from 'axios'
import uuid from 'react-uuid'
import FloatMessage from './Component/FloatMessage'

const fetchData = word => {
    return new Promise((resolve) => {
        const temp = word.toLowerCase();
        let w = '';
        [...temp].forEach((letter) => {
            if(/[a-z]/.test(letter)){
                w += letter
            }
        })

        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`, {method: 'GET'})
        .then(response => {
            if(response.status === 200){
                resolve(response.data[0])
            }
        }).catch(() => resolve({"title":"No Definitions Found", "resolution":"You can try the search again at later time or head to the web instead."}))
    })
}

function Viewer({currentNote: {date, text}}) {
    const [wordsArray, setWordsArray] = useState([]) 
    const [wordData, setWordData] = useState([])
    const [showMeaning, setShowMeaning] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setWordsArray(text.split(' '))
    }, [setWordsArray, text]);

    const clickHandler = async (word) => {
        setLoading(true)
        const data = await fetchData(word)
        if(data === false) {
            setWordData({"title":"No Definitions Found", "resolution":"You can try the search again at later time or head to the web instead."})
        } else {
            setWordData(data)
            setShowMeaning(true)
        }
        setLoading(false)
    }

    const setShowMessage = React.useCallback((val) => {setShowMeaning(val)}, [])
    const resetWordData = React.useCallback(() => {setWordData([])}, [])

    return (<>
        <motion.div className="viewer-container"
            initial={{ x: '100vw' }} 
            animate={{ x: 0 }}
            exit={{ x: '100vw'}}
            transition={{type: 'spring', damping: 15, mass: 1, stiffness: 60}}>
            <div className="date"> <span>{date}</span> </div>
            <pre className="text scroll">
                {wordsArray.map(word => 
                <Fragment key={uuid()}>{` `} 
                    <span onClick={() => clickHandler(word)}>{word}</span>{` `}
                </Fragment>)}
            </pre>
        </motion.div>

        <AnimatePresence>
                {showMeaning ? 
                <FloatMessage wordData={wordData} 
                resetWordData={resetWordData} 
                setShowMessage={setShowMessage}/> :
                isLoading && <motion.div className="float-message-container">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </motion.div>}
        </AnimatePresence></>
    )
}

export default Viewer