import * as React from 'react';
import ajax from '../helpers/ajax'

export default class Home extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
       ajax()
    }

    render(){
        return(
            <div>
                ob huohu yibo 
            </div>
        )
    }
}