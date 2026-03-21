import './Index.css';
import Header from './imported-comonents/Header'
import Main from './Main'
import { useEffect, useReducer } from 'react';

const initialState = {
  questions : [],

  // loading, error, ready, active, finished 
  status: 'loading',
};

function reducer(state, action){
  switch(action.type){
    case 'dataReceived': 
      return {
        ...state, questions: action.payload,
         status: "ready"
      };
    
    case 'dataFailed': 
      return{
        ...state, 
        status: 'error',  
      };
    
    default : throw new Error("Action Unknown!");
  }
}

export default function App(){
  const[state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    fetch("http://localhost:8000/questions")
      .then(res=> res.json())
      .then(data => dispatch({type: 'dataReceived', payload: data}))
      .catch(err => dispatch({type: 'dataFailed'}));
  }, []);

  return(
    <div className='app'>
      <Header> </Header>
      <Main> 
        <p>1-14</p> 
        <p>Question?</p>
      </Main>
    </div>
  )
}