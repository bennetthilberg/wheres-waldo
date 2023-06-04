import {useEffect,useState} from 'react';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';


export default function HiScores({}){
    const [place1, setPlace1] = useState({'name': '', 'score': 0});
    const [place2, setPlace2] = useState({'name': '', 'score': 0});
    const [place3, setPlace3] = useState({'name': '', 'score': 0});
    const [place4, setPlace4] = useState({'name': '', 'score': 0});
    const [place5, setPlace5] = useState({'name': '', 'score': 0});
    async function getScoresCol(){
        try{
            const db = getFirestore();
            const scoresCol = collection(db, 'scores');
            const q = query(scoresCol, orderBy("score", "desc"), limit(5));
            const qSnaps = await getDocs(q);
            return qSnaps;
        } catch (error) {
            console.log('caught! :(')
        }
    }
    function setTop5(docs){
        setPlace1(docs[0].data());
        setPlace2(docs[1].data());
        setPlace3(docs[2].data());
        setPlace4(docs[3].data());
        setPlace5(docs[4].data());
    }
    useEffect(()=>{
        getScoresCol().then(qSnaps => {
            setTop5(qSnaps.docs);
        });
    }, [])
    return(
        <div id="hiscores">
            <p>High Scores</p>
            <div id="btmPart">
                <div className="spacer"></div>
                <div id="leaderboard">
                    
                    <div className="hs"><p>1: {place1.name}</p><p className='lScore'>{place1.score}</p>
                        </div>
                    <div className="hs"><p>2: {place2.name}</p><p className='lScore'>{place2.score}</p>
                        </div>
                    <div className="hs"><p>3: {place3.name}</p><p className='lScore'>{place3.score}</p>
                        </div>
                    <div className="hs"><p>4: {place4.name}</p><p className='lScore'>{place4.score}</p>
                        </div>
                    <div className="hs"><p>5: {place5.name}</p><p className='lScore'>{place5.score}</p>
                        </div>
                </div>
                <div className="spacer"></div>
            </div>
        </div>
    );
}