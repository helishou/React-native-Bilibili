const fetchData = (url, timeout = 20000, body) => {
  const request = new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      // 请求状态成功，解析请求数据
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          //resolve(res);
          resolve(res.json());
        }
        reject(`${res.status}`);
      })
      // 返回请求的数据
      .then(responseJson => {
        resolve(responseJson);
      })
      // 返回错误
      .catch(e => reject(e.message));
  });

  // 定义一个延时函数
  const timeoutRequest = new Promise((resolve, reject) => {
    setTimeout(reject, timeout, 'Request timed out');
  });

  // 竞时函数，谁先完成调用谁
  return Promise.race([request, timeoutRequest]).then(
    res => {
      return res;
    },
    m => {
      throw new Error(m);
    },
  );
};

export default fetchData;
