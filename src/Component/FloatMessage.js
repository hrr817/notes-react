import React, {Fragment, useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import uuid from 'react-uuid'
import './FloatMessage.css'

const FloatMessage = ({wordData, resetWordData, setShowMessage}) =>  {
    const [audioUrl, setAudioUrl] = React.useState(null)
    const [isError, setError] = useState(false)
    let audio = undefined

    useEffect(() => {
        // Definition not found
        if(wordData['title']){
            setError(true)
        }
        if(!wordData['title'] && wordData.length !== 0 && wordData.phonetics.length !== 0) {
            // No error, found audio url
            setAudioUrl(wordData.phonetics[0].audio)
        }
        // Clean up wordData after use
        return () => {
            resetWordData()
        }
    }, [])

    const play = () => {
        audio = document.getElementById('myAudio')
        if(audio.readyState === 4) {
            audio.load()
            audio.play()
        }
    }

    return (
        <motion.div className="float-message-container"
        initial={{ opacity: 0, scale: 0}} 
        animate={{ opacity: 1, scale: 1}}
        exit={{ opacity: 0, scale: 0}}
        transition={{type: 'spring', bounce: 0.1, mass: 1, stiffness: 55 }}>
            {isError? 
            <Fragment>
                <div className="head"> <span className="word">{wordData.title}</span> </div>
                <ul className="definition">
                    <li>{wordData.resolution}</li>
                </ul>
            </Fragment> : 
            <Fragment>
                <div className="head">
                    <span className="word" id="word">
                        {!wordData['title'] && wordData.word}
                        {!wordData['title'] && wordData.phonetics.length !== 0 && 
                        <>
                            <audio id="myAudio">
                            <source src={audioUrl} type="audio/mp3"/>
                            </audio>
                            <span className="button-container"> <button onClick={() => play()}/> </span>
                        </>}
                    </span>
                    <span className="phonetic"> {!wordData['title'] && wordData.phonetics.length !== 0 && wordData.phonetics[0].text} </span>
                </div>
                <ul className="definition">
                {!wordData['title'] && wordData.meanings.map(m => 
                    <Fragment key={uuid()}> 
                        <span> {m.partOfSpeech} </span> 
                        {m.definitions.map(d => 
                            <li key={uuid()}> {d.definition} </li>
                        )}
                    </Fragment>)}
                </ul>
            </Fragment>}
            <div className="close-button" onClick={() => setShowMessage(false)}><button/></div>
        </motion.div>
    )
}

export default React.memo(FloatMessage)
