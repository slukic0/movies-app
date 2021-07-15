import React, { Component } from 'react';
import {OverlayTrigger, Tooltip, Button} from 'react-bootstrap';

class OverlayButton extends Component {
    render(){
        return(
            <OverlayTrigger
            transition={false}
            placement="bottom"
            overlay={<Tooltip id="my-tooltip">{this.props.tip}</Tooltip>}
            >
            {({ ref, ...triggerHandler }) => (
                <div className="d-grid gap-2" ref={ref}> 
                    <Button
                        variant={this.props.variant}
                        size={this.props.size}
                        onClick={this.props.onClick}
                        style={{cursor: 'not-allowed'}}
                        {...triggerHandler}
                    >
                    <span className="ms-1">{this.props.text}</span>
                    </Button>
                </div>
            )}
            </OverlayTrigger>
        )
    }
} 

export default OverlayButton

