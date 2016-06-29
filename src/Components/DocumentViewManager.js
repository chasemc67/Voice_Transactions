import React, { Component } from 'react';
import Invoice from "./Invoice";
import SalesReceipt from "./SalesReceipt";
import Item from "./Item";

export default class DocumentViewManager extends Component {
    constructor(props) {
        super(props);
    }

    documentToRender(){
        if (this.props.documentType === "Invoice") {
            return(
                <Invoice parameters={this.props.parameters}/>
            );
        } else if (this.props.documentType === "SalesReceipt") {
            return(
                <SalesReceipt parameters={this.props.parameters} />
            );
        } else if (this.props.documentType === "AddItem" ){
            return (
                <Item parameters={this.props.parameters} />
            );
        } else {
            return(
                <div> <h1> Activity will display here </h1> </div>
            );
        }
    }

    render() {
        return(
            <div className="document">
                {this.documentToRender()}
            </div>
        );
    }
}

DocumentViewManager.propTypes = {
    documentType: React.PropTypes.string,
    documentParameters: React.PropTypes.object
};