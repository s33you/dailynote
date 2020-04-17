import axios from '../utils/http'

const Card = {
  getRandomCard () {
    return axios.get('/randomCard')
  },
  postApi (data) {
    return axios.post('/testpost', data, { headers: { "Content-Type": "application/json; charset=utf-8" } })
  }
}
export default Card
