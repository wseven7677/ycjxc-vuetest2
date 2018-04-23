import axios from 'axios'

const ajax = function (url,callback) {
  return axios.get(url).then(res => {
    callback(res.data);
  }).catch(err => {
    console.log(err);
  });
};

export default ajax;
