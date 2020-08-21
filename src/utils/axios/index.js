import axios from './axios.config'

const request = {}

const defaultGetConfig = {

}
const defaultPostConfig = {

}
request.get = (url, config) => axios.get(url, {
    params: {
        ...defaultGetConfig,
        ...config
    }}
)

request.post = (url, config) => axios.post(url, {
    ...defaultPostConfig,
    ...config
})



export default request 