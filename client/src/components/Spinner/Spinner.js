import { Component } from "react";

class Spinner extends Component{
    render(){
        return(
            <div className='container text-center'>
                <div className="spinner-border text-center" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
    }
}

export default Spinner