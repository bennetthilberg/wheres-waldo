import {useEffect,useState} from 'react';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';


export default function Game({}){
    const [gameActive, setGameActive] = useState(false);
    const [score, setScore] = useState(40);
    const [divColor, setDivColor] = useState('default');
    const [countActive, setCountActive] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [wonYet, setWonYet] = useState(false);
    const [btnText, setBtnText] = useState('Start');
    const [lowestHiScore, setLowestHiScore] = useState(999);
    const [namePrompting, setNamePrompting] = useState(false);
    let finalScore = 0;
    useEffect(() => {
        async function getTop5(){
            const db = getFirestore();
            const col = collection(db, 'scores');
            const top5Docs = await getDocs(query(col, orderBy("score", "desc"), limit(5)));
            return(top5Docs);
        }
        getTop5().then(t5 => {
            setLowestHiScore(t5.docs[4].data().score);
        })
    }, [])
    
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
            setTimeout(() => {
                setGameActive(false);
                if(finalScore > lowestHiScore){
                    console.log('high!!!')
                    setNamePrompting(true);
                }
                else{
                    console.log('low')
                }
            }, 1000);
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
            {namePrompting ? 
            <div id='nameForm'>
                <h1>You got a high score!</h1>
                <h2>Enter your name...</h2>
                <div>
                    <form id='nameSubmitForm' className='nameActualForm'>
                        <input type="text" id="hsname" />
                        <button type="submit">Submit</button>
                    </form>
                    
                </div>
                
            </div> 
            : <></>}
        </div>
        // left: 383 to 414
        // top: 122 to 157
    );
}