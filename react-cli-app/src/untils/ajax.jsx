// 普通原生方法
const ajax=(option)=>{
    let xhr;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else{
        xhr=new ActiveXObject('Microsoft.XMLHTTP')
    }

    const {method,url,callBack}=option

    if(option.method.toUpperCase()=='GET'){
        xhr.open(method,url,true)
        xhr.send(null)
    }else if(option.method.toUpperCase()=='POST'){
        xhr.open(method,url,true)
        xhr.send(body)
    }
    
    xhr.onreadystatechange=()=>{
        const {readyState,status,responseText}=xhr
        if(readyState===4 && status===200){
           const result=responseText
           option.callBack(result)
        }else if(status===404){
           console.log('请求数据失败'+ status) 
        }
    }
}

export default ajax