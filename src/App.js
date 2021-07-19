import React,{useEffect,useState} from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import {verifySession} from './api/apiBaseProvider'
import loadingGif from './assets/loading.gif'
import styled from 'styled-components'

const LoadingBox = styled.div`
  width:99vw;
  height:99vh;
  display:flex;
  align-items:center;
  justify-content:center; 
`

const ImgLoading = styled.img`
  height:60px;
  width:60px;

`
const App=()=>{ 

  const [loading,setLoading] = useState(true)
  const [session,setSession] = useState(false)

  useEffect(()=>{
    
    verifySession().then(({session,user})=>{
      
      setTimeout(()=>{
        setSession(session)
        setLoading(false)
      },1000)
    })
    
  },[])

  return(  
      <BrowserRouter>
        <Switch>
          <Route exact path = '/home' component = {Home}  /> 
          <Route exact path = '/login' component = {Login} />
        </Switch>

        {loading
        ? <Loading />
        : <div>
          {session
            ? <Redirect to = "/home" />
            : <Redirect to = "/login" />
          }
          </div>
        }
      </BrowserRouter>
    )
  } 

const Loading = () => {
  
  return (
    <LoadingBox>
      <ImgLoading src={loadingGif} />
    </LoadingBox>

  )

}
export default App;
