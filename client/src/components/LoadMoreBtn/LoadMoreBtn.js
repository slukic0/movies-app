import React, { Component } from 'react';
import './LoadMoreBtn.css'

class LoadMoreBtn extends Component{
    render(){
        return(
            <div className="loadMoreBtn" onClick={this.props.onClick}>
                <p>{this.props.text}</p>
            </div>
        )
    }
}

export default LoadMoreBtn