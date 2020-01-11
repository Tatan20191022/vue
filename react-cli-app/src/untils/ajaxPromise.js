const ajax = (option: any): Promise<any> => {
    const { url, method, headers, body } = option;
  
    return new Promise((resolve, reject) => {
      let xmlHttp;
  
      // xmlHttp兼容做处理
      if ((window as any).XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
      } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
      }
  
      // 监听请求状态
      xmlHttp.onreadystatechange = () => {
        const { readyState, status, responseText } = xmlHttp;
  
        if (readyState === 4 && status === 200) {
          resolve(JSON.parse(responseText));
        } else if (status === 404) {
          reject(new Error(status));
        }
      };
  
      xmlHttp.open(method, url, true);
      // 设置请求header
      Object.keys(headers).forEach(key => {
        xmlHttp.setRequestHeader(key, headers[key]);
      });
  
      if (method.toLocaleLowerCase() === 'get') {
        xmlHttp.send();
      } else {
        xmlHttp.send(body);
      }
    });
  };
  
  export default ajax;
  