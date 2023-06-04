import {useEffect,useState} from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


export default function Game({}){
    const [gameActive, setGameActive] = useState(false);
    const [score, setScore] = useState(2);
    const [divColor, setDivColor] = useState('default');
    const [countActive, setCountActive] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [wonYet, setWonYet] = useState(false);
    const [btnText, setBtnText] = useState('Start');
    let finalScore = 0;
    function handleSceneClick(e){
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        console.log("Left: " + x + " Top: " + y + ".");
        if(x > 383 && x < 414 && y > 122 && y < 157){
            // found him
            setBtnText(`Score: ${score.toFixed(1)}`);
            setDivColor('green');
            setCountActive(false);
            clearInterval(intervalId);
            setTimeout(() => {setGameActive(false);}, 1000);
            setWonYet(true);
            finalScore = score.toFixed(1);
            console.log(finalScore);
            
        }
    }
    function handleStartClick(){
        if(!wonYet){
            setGameActive(true);
            setCountActive(true);
        }
        
    }
    useEffect(() => {
        let id;
        if(gameActive){
            id = setInterval(() => {
                if(countActive){
                    setScore(prevScore => prevScore - 0.1);
                }
                
            }, 100)
            setIntervalId(id);
        }
        return () => clearInterval(intervalId);
    }, [gameActive, countActive])
    useEffect(() => {
        if(score < 0.1){
            setDivColor('red');
            setGameActive(false);
            setBtnText('You lose!');
            setWonYet(true);
        }
    }, [score])
    return(
        <div id="game">
            <div id="sideBar">
                <p>Find Waldo!</p>
                <div id={divColor} onClick={handleStartClick} className='purpBtn'>{
                    gameActive ? <div>Score: {score.toFixed(1)}</div> : <div>{btnText}</div>
                    }
                </div>
                
            </div>
            {gameActive ? <img className='scene' onClick={handleSceneClick} src="https://chandralynn.files.wordpress.com/2014/06/waldo5.png" alt=""/> : <></>}
            {/*<img className='scene' onClick={handleClick} src="https://chandralynn.files.wordpress.com/2014/06/waldo5.png" alt=""/>*/}
        </div>
        // left: 383 to 414
        // top: 122 to 157
    );
}