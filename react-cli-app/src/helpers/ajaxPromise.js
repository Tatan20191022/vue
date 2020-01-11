// Promise方法

const ajax =(options)=>{
const {method,url,headers,body}=options
return new Promise((resolve,reject)=>{

    let xhr;

    if(window.XMLHttpRequest){
        // 兼容火狐，safare等
        xhr=new XMLHttpRequest();
    }else{
        // 兼容IE
        xhr=new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange=()=>{
        const {status,readyState,responseText}=xhr;
        if(readyState===4&&status===200){
            resolve(JSON.parse(responseText))
        }else if(status===404){
            reject(new Error(status))
        }
    }

    // 调用open方法
    xhr.open(method,url,true);
    Object.keys(headers).forEach(key=>{
        xhr.setRequestHeader(key,headers[key]);
    });

    // 调用send方法
    if(method.toLocaleLowerCase()==='get'){
        // 如果是get方法send为空或者为null
        xhr.send()
    }else{
        // post发送body
        xhr.send(body)
    }
})
}

export default ajax;