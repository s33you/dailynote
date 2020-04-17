const api = {
    development:'http://192.168.1.6:3000',
    production:'http://192.168.1.6:3000',
    mock:'',
    test:''
}
export const baseURL = api[process.env.NODE_ENV || 'development']