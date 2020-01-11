import {Observable,pipe,of,from } from 'rxjs';
import {map,mapTo,mergeMap,startWith,endWith} from 'rxjs/operators';
import {Epic,ofType} from 'redux-observable';


// actions$ action被封装成Observable对象传入到函数内部
export const learn=(actions$,store)=>{
    return actions$.pipe(
        // ofType 匹配相应的action
        ofType('actionsString'),
        // mergeMap 返回新的Observable对象，后续方法取消action$的订阅，而订阅返回新的http对象
        mergeMap(action=>{
            return ajax({
                url:'/path',
                method:'get',
                responseType:'json'
            }).pipe(
                map(res=>{
                    console.log(res)
                    try{
                        return res
                    } catch(err){
                        return console.error(res.err);
                    }
                })
            )
            
        })
    )
}