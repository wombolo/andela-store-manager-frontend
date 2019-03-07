import axios from 'axios';

// baseURL:'http://localhost:8000/api/v1',
export default axios.create({
  baseURL:'https://tia-store-manager.herokuapp.com/api/v1',
  headers:{
    'access-token': localStorage.getItem('authToken')
  }
})
