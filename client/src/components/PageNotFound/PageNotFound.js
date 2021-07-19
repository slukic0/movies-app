import { Component } from "react";

class PageNotFound extends Component{
    render(){
        return(
            <div className="alert alert-danger" role="alert">
                404: Page Not Found!
            </div>
        )
    }
}

export default PageNotFound