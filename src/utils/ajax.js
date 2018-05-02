import axios from 'axios'

const ajax = function (url,callback,mthd,data) {
  if(! mthd){
    mthd = 'get';
    data = '';
  }
  var config = {
    method: mthd,
    url: url,
    data: data
  };

  return axios(url,config).then(res => {
    callback(res.data);
  }).catch(err => {
    console.log(err);
  });
  
};

export default ajax;
