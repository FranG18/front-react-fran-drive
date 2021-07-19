import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = 'http://192.99.166.83:4000'

const getUrl = (route) => {
  
  return baseUrl + '/' + route
  
}

export const verifySession = async () => {
 
 
  const session = await axios.get(getUrl(''))
  
  return session.data
  
}

export const login = async (user,password) => {

   const response = await axios.post(getUrl('login'),{
      user,
      password
   })

  return response.data;
}

export const registrer = async (user,password,email) => {

  const response = await axios.post(getUrl('registrer'),{
    user,
    password,
    email
  })

  return response.data
}
