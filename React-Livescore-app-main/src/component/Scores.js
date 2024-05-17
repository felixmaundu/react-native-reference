import React, { useEffect, useState } from 'react'
import Score from './Score';
import './Scores.css'



// livescoreapikey : 47ebd85ab310e584a034268128bd60da1f8a18362f61cc6c56903e7b2dc3bef9
const TourUrl='https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=soccer&Timezone=-7'

const Scores = () => {

    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7a1576e1d2mshff79dcb3cbb9727p1db395jsnda614f582d9b',
		'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
	}
};


    const [tour, setTour]=useState([])
    const [event, setEvent]=useState([])
    const getTour=async()=>{
        const response=await fetch(TourUrl,options)
        const tour= await response.json()
        setTour(tour.Stages)
        console.log(tour.Stages)
    }
    useEffect(()=>{
        getTour()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const gameClickHandler=(id)=>{
      console.log(id)
          const GametoDissplay=tour.filter((person) => person.id === id)
    }
  return (
    <section className="container">
        {tour.map((games)=>{
          return(
            <div key={games.Sid}>
              <h2>{games.Ccd}</h2>
             
              <h2>{games.Scd}</h2>
             
              {games.Events.map((gameEvent)=>{
                return(
                  <div className='gmmm' key={gameEvent.Eid} onClick={()=>gameClickHandler(gameEvent.Eid)}>
                      <h5 className='time'>{gameEvent.Eps==='NS'?gameEvent.Eps==='? ?':gameEvent.Eps}</h5>
                      <div className='ghff'>

                      <div className='team1'>
                          {gameEvent.T1.map((team)=>{
                      return(
                        <div key={team.ID}>
                            <p>{team.Nm}</p>
                        </div>
                      )
                      })}

                      <h1>{gameEvent.Tr1}</h1>
                      </div>
                      <div className='team2'>
                          <h1>{gameEvent.Tr2}</h1>
                      {gameEvent.T2.map((team2)=>{
                        return(
                        <div key={team2.ID}>
                          <p>{team2.Nm}</p>
                          
                        </div>
                        
                       )
                   })}
                      </div>

                      
                      </div>
                      <p>Star</p>
                      
                      </div>
                  
                )
                
              })}
            </div>

            
              
            
            
          )
        })}
    </section>
  )
}

export default Scores