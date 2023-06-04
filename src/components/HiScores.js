import {useEffect,useState} from 'react';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';


export default function HiScores({}){
    async function getScoresCol(){
        try{
            const db = getFirestore();
            const scoresCol = collection(db, 'scores');
            const q = query(scoresCol);
            const qSnaps = await getDocs(q);
            qSnaps.forEach((doc) => {
                console.log(doc.data().name);
            })
            
        } catch (error) {
            console.log('caught! :(', error.message)
        }
    }
    useEffect(()=>{
        getScoresCol();
    }, [])
    return(
        <div id="hiscores">
            hiscores
        </div>
    );
}