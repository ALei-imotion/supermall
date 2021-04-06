import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 以下情况可以使用拦截器来拦截，编辑config后再将它发出去
    // 01-比如config中的一些信息不符合服务器的要求
    // 02-比如每次发送网络请求时，都希望在界面显示一个请求的图标
    // 03-某些网络请求(比如登录(token))，必须携带一些特殊的信息
    // ...等等
    return config   // 拦截完毕之后，在用完之后记得将它return出去，这样请求才能发送出去
  }, err => {
    console.log(err);
    return err
  });

  // 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data   // 处理完毕后，将data中的数据return出去
  }, err => {
    // console.log(err);
    return err
  });

  // 3.发送真正的网络请求
  // instance(config)本身返回值就是一个Promise，所以直接将它return就好，不需要在将它写成promise
  return instance(config)
}