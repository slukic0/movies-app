import { Component } from "react";

class Spinner extends Component{
    render(){
        return(
            <div class='container text-center'>
                <div class="spinner-border text-center" role="status">
                    <span class="sr-only"></span>
                </div>
            </div>
        )
    }
}