import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {login,registrer} from '../api/apiBaseProvider'
import { useHistory } from 'react-router'

const FormBox = styled.div`
  width:100vw;
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
`
 
const FormLogin = styled.form`  
  padding:16px;
  display:flex;
  flex-direction:column;
  align-items:center;
`
const InputBox = styled.div`
  padding:8px;
  
  input {
    width:200px;
  }
`

const Input = styled.input`
    padding:4px;
    border-radius:16px;
`

const Registrer = styled.div`
  color:white;
  margin:4px 0px;
  cursor:pointer;
  &:hover{
    border-bottom:1px solid white;
  }
`

const ErrorBox = styled.div`
  color:red;
  opacity: ${props => props.opacity};

`
const Login=()=>{
  
  const [user,setUser] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [rePassword,setRepassword] = useState("")
  const [registrerText,setRegistrerText] = useState("¿No tienes cuenta?,  ¡Registrate!")
  const [registrerForm,setRegistrerForm] = useState(false)
  const [errorText,setErrotext] = useState("")
  const history = useHistory()

  const formSubmit = async (event) =>{
    event.preventDefault()

    if(registrerForm){
      if(email === "" || user === "" || password === "" || rePassword === "" ){
        setErrotext('Todos los campos son obligatorios')
      }else if(password !== rePassword){
        setErrotext('Las contraseñas no coinciden')
      }else{
        const response = await registrer(user,password,email)

        if(response){
          history.push("/home")
        }else{
          setErrotext('El email que ingresas ya existe')
        }
      }
    }else{
      console.log(user,password)
      if(user === "" || password === ""){
        setErrotext('Todos los campos son obligatorios')
      }else{
        const response = await login(user,password)
        if(response){
          history.push("/home")
        }else{
          setErrotext('No estas registrado')
        }
      }
    }
  }
  
  const clickRegistrer = (event) => {
    setRegistrerForm(!registrerForm)
    setRegistrerText((registrerText === "¿No tienes cuenta?,  ¡Registrate!") ? "¿Ya tienes cuenta?, ¡Ingresa!" : "¿No tienes cuenta?,  ¡Registrate!")
    
  }

  useEffect(()=>{
    if(registrerForm){
      setRegistrerText( "¿Ya tienes cuenta?, ¡Ingresa!" )
    }else{
      setRegistrerText("¿No tienes cuenta?,  ¡Registrate!")
    }
  },[registrerForm])

  return (
    <FormBox onSubmit = {formSubmit}>
      <div style={{fontSize:"18px"}}>Fran Drive</div>
      {!registrerForm 
      ? <LoginForm user = {user} password = {password} setUser = {setUser} setPassword = {setPassword}  /> 
      : <RegistrerFrom user = {user} email = {email} password = {password} rePassword = {rePassword} setUser = {setUser} setPassword = {setPassword} setEmail = {setEmail} setRepassword = {setRepassword} />
      }
      <ErrorBox opacity = {errorText !== "" ? 1 : 0} >{errorText}</ErrorBox>
      
      <Registrer onClick={(event) => {clickRegistrer(event)}}>
         {registrerText}
     </Registrer>
    </FormBox>
  ) 

}


const LoginForm = ({user,password,setUser,setPassword}) => {
  return (
    <FormLogin>
      <InputBox>
        <Input value = {user} onChange = {(e) => setUser(e.target.value)}  placeholder = "Usuario" type = "text" />
      </InputBox>
      <InputBox>
        <Input value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder = "Contraseña" type = "password"/>
      </InputBox>
    
      <InputBox>
        <Input style={{background:"#65667b",border:"1px solid #3c405a",cursor:"pointer"}} type = "submit" value = "Ingresar"/>
      </InputBox>
  </FormLogin>
  )
}

const RegistrerFrom = ({user,password,rePassword,email,setUser,setPassword,setRepassword,setEmail}) => {

  return (
    <FormLogin>
      <InputBox>
        <Input value = {user} onChange = {(e) => setUser(e.target.value)}  placeholder = "Usuario" type = "text" />
      </InputBox>
      <InputBox>
        <Input value = {email} onChange = {(e) => setEmail(e.target.value)}  placeholder = "Email" type = "text" />
      </InputBox>
      <InputBox>
        <Input value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder = "Contraseña" type = "password"/>
      </InputBox>
      <InputBox>
        <Input value = {rePassword} onChange = {(e) => setRepassword(e.target.value)} placeholder = "Repetir Contraseña" type = "password"/>
      </InputBox>
      <InputBox>
        <Input style={{background:"#65667b",border:"1px solid #3c405a",cursor:"pointer"}} type = "submit" value = "Registrarse"/>
      </InputBox>
    </FormLogin>
  )
}

export default Login;
