import axios from 'axios'

let util = {};
util.title = function (title) {
    title = 'SUSTechFlow';
    window.document.title = title;
};
const tokenHandler = (request) => {
    request.headers.Authorization =  localStorage.temp_token;
    return request
};
util.http = axios.create({
    baseURL: 'https://sustechflow.top/api',
});
util.http.interceptors.request.use(tokenHandler);
export default util;