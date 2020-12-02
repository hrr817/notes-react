import React, {Fragment, useEffect} from 'react'
import uuid from 'react-uuid'

import './FloatMessage.css'

const FloatMessage = ({isLoading, wordData, setWordData, setShowMessage}) =>  {


    const [show, setShow] = React.useState('ERROR')
    const [audioUrl, setAudioUrl] = React.useState(null)
    
    let audio = undefined

    useEffect(() => {
        // Clean up wordData after use
        return () => {
            setWordData([])
        }
    }, [])

    useEffect(() => {
        if(wordData.word) {
            setShow('MEANING')
            if(wordData.length !== 0 && wordData.phonetics.length !== 0) setAudioUrl(wordData.phonetics[0].audio)
        } else {
            setShow('ERROR')
        } 

    }, [wordData])

    const play = () => {
        audio = document.getElementById('myAudio')
        if(audio.readyState === 4) {
            audio.load()
            audio.play()
        }
    }

    const display = (show) => {
        switch(show){
            case 'ERROR':
                return (
                    <div className="float-message-container">
                        {isLoading? <>Loading...</> : <>
                        <div className="head">
                            <div className="word">
                                <span> {wordData.title} </span>
                            </div>
                        </div>
                        <div className="definition">
                            {wordData.resolution}
                        </div></>}
                        <div className="close-button" onClick={() => setShowMessage(false)}><button/></div> 
                    </div>
                )
            case 'MEANING':
                return (
                <div className="float-message-container">
                    {isLoading? <>Loading...</> : <>
                    <div className="head">
                        <div className="word" id="word">
                            <span> {wordData.word} </span>
                            {wordData.phonetics.length !== 0 && <>
                                <audio id="myAudio">
                                <source src={audioUrl} type="audio/mp3"/>
                                </audio>
                                <span className="button-container"> <button onClick={() => play()}/> </span>
                            </>}
                        </div>
                        <div className="phonetic"> {wordData.phonetics.length !== 0 && wordData.phonetics[0].text} </div>
                    </div>
                    <ul className="definition">
                    {wordData.meanings.map(m => 
                        <Fragment key={uuid()}> 
                            <span> {m.partOfSpeech} </span> 
                            {m.definitions.map(d => 
                                <li key={uuid()}> {d.definition} </li>
                            )}
                        </Fragment>)}
                    </ul></>}
                    <div className="close-button" onClick={() => setShowMessage(false)}><button/></div>
                </div>
                )    
            default: 
                return
        }
    }

    return (
        display(show)
    )
}

export default React.memo(FloatMessage)
