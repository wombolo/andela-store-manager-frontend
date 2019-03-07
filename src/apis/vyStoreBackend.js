import axios from 'axios';

export default axios.create({
  // baseURL:'http://localhost:8000/api/v1',
  baseURL:'https://tia-store-manager.herokuapp.com/api/v1',
  headers:{
    'access-token': localStorage.getItem('authToken')
  }
})
