import { useEffect } from "react"

export default function Timer({dispatch, secondsRemaining}){
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = Math.floor(secondsRemaining % 60);
  useEffect(function(){
    const id = setInterval(()=>{ 
      dispatch({type: "tick"})
      return() => clearInterval(id)
    }, 1000)
  }, [dispatch])

  return(
    <div className="timer">

      {minutes  < 10 && "00"}
      {minutes}: {seconds < 10 && "00"}
      {seconds}
    </div>
  )
}