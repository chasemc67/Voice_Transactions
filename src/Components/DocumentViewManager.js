import React, { Component } from 'react';
import Invoice from "./Invoice";
import SalesReceipt from "./SalesReceipt";
import Item from "./Item";

export default class DocumentViewManager extends Component {
    constructor(props) {
        super(props);
    }

    documentToRender(){
        if (this.props.document.type === "Invoice") {
            return(
                <div className="invoice">
                    <Invoice name={this.props.document.name} />
                    {this.props.items.map((item) => {
                            return <Item name={item.service} quantity={item.quantity} />;
                        })
                    }
                </div>
            );
        } else if (this.props.document.type === "SalesReceipt") {
            return(
                <SalesReceipt name={this.props.document.name} />
            );
        } else if (this.props.document.type === "AddItem" ){
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
    document: React.PropTypes.object,
    items: React.PropTypes.array
};