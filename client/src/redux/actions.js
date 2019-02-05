import {negotiationSchema} from './middlewares/schemas/schemas'

const addContract = (contract) => ({
  type: 'ADD_CONTRACT',
  contract
})

const signUp = (user) => ({
  type: 'SIGN_UP',
  user
})

const login = (api) => ({
  type: 'LOGIN',
  api
})

const getAll = () => ({
  type: 'GET_ALL',
  api: {
    route: 'negotiations',
    schema: [negotiationSchema]
  }
})

const getOne = (api) => ({
  type: 'GET_ONE',
  api
});

const postNewNegotiation = (api) => ({
  type: 'POST_NEGOTIATION',
  api
});

const getUser = api => ({
  type:'GET_USER',
  api
})






export {
  addContract,
  signUp,
  login,
  getAll,
  postNewNegotiation,
  getOne,
  getUser
}
