// 能发送异步ajax请求的函数模块
// 封装axios
import axios from 'axios';

//优化:统一处理请求异常
//在外层包一个promise对象
//在请求出错时,补reject(error),自己提示问题
// axios.defaults.withCredentials = true;
export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise;
    //1.执行异步ajax请求

    if (type === 'GET') {
      //发get请求
      promise = axios.get(url, {
        //配置对象
        params: data, // 指定请求参数
      });
      // console.log('请求头', headers);
    } else {
      //发post请求
      promise = axios.post(url, data);
    }
    //2.如果成功,调用resolve
    promise
      .then(response => {
        resolve(response.data);
        //3.如果失败,调用reject
      })
      .catch(error => {
        //reject(error)
        console.log('请求失败', error.message);
      });
  });
}
