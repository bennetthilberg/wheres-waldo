import {useEffect,useState} from 'react';

export default function Game({}){
    const [gameActive, setGameActive] = useState(false);
    const [score, setScore] = useState(2);
    const [divColor, setDivColor] = useState('default');
    function handleSceneClick(e){
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        console.log("Left: " + x + " Top: " + y + ".");
    }
    function handleStartClick(){
        setGameActive(true);
    }
    useEffect(() => {
        if(gameActive){
            setInterval(() => {
                setScore(prevScore => prevScore - 0.1);
            }, 100)
            
        }
    }, [gameActive])
    useEffect(() => {
        if(score < 0.1){
            setDivColor('red');
            setGameActive(false);
        }
    }, [score])
    return(
        <div id="game">
            <div id="sideBar">
                <p>Find Waldo!</p>
                <div id={divColor} onClick={handleStartClick} className='purpBtn'>{
                    gameActive ? <div>Score: {score.toFixed(1)}</div> : <p>Start</p>
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