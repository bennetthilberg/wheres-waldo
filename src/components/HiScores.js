import {useEffect,useState} from 'react';
import { getFirestore, collection, getDoc } from 'firebase/firestore';


export default function HiScores({}){
    async function getScoresCol(){
        try{
            const db = getFirestore();
            const scoresCol = collection(db, 'scores');
            console.log(scoresCol);
        } catch (error) {
            console.log('caught! :(')
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