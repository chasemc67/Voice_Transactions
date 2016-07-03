// This is a single react component that can be used to query the agent.
// It will include a text field, and a submit button,
// But also a microphone button.
// And (for now) some getContext and deleteContext buttons

// Also contains a field for an agent response

import React, { Component } from 'react';

export default class QueryComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {agentResponse: "", queryString: ""};

        // this.handleAgentResponse = this.handleAgentResponse.bind(this);

        this.onQueryAgentString = this.onQueryAgentString.bind(this);
        this.handleQueryAgent = this.handleQueryAgent.bind(this);
        this.handleStartListening = this.handleStartListening.bind(this);
        this.handleStopListening = this.handleStopListening.bind(this);
        this.getCurrentContext = this.getCurrentContext.bind(this);
        this.deleteCurrentContext = this.deleteCurrentContext.bind(this);
    }

    onQueryAgentString(e) {
        this.setState({queryString: e.target.value.toString()});
    }

    handleQueryAgent(e) {
        let query = {
            "query": [
                this.state.queryString
            ],

            "lang": "en",
            "sessionId": "123456789"
        };

        this.props.Agent.queryAgent(query).then((response) => {
            this.handleAgentResponse(response);
        });
    }

    handleAgentResponse(response) {
        this.setState({agentResponse: response.result.speech})
        this.props.onRecieveResponse(response);
    }

    handleStartListening(e) {
        var config = {
            server: 'wss://api.api.ai:4435/api/ws/query',
            token: "88f0b9f6ed16438c81450397aa3b2385",// Use Client access token there (see agent keys).
            sessionId: "123456789",
            onInit: function () {
                console.log("> ON INIT use config");
                apiAi.open();
            }
        };

        apiAi = new ApiAi(config);
        apiAi.init();

        apiAi.onOpen = function () {
            apiAi.startListening();
        };

        apiAi.onResults = function (data) {

            var processResult = function (data) {
                console.log(data);
            }

            var status = data.status;
            var code;
            if (!(status && (code = status.code) && isFinite(parseFloat(code)) && code < 300 && code > 199)) {
                text.innerHTML = JSON.stringify(status);
                return;
            }
            processResult(data.result);
        };
    }

    handleStopListening() {
        apiAi.stopListening();
    }

    getCurrentContext() {
        this.props.Agent.getContext().then((response) => {
            console.log("Conext is: ");
            console.log(response);
        });
    }

    deleteCurrentContext() {
        this.props.Agent.deleteContext().then((response) => {
            console.log("deleted context");
        });
    }

    render() {
        return (
            <div className="QueryComponent">
                <h1> Hi, I'm QB! what would you like to do? </h1>
                <textarea className="queryAgent" rows={1} onInput={this.onQueryAgentString} placeholder="Say something to QB" />
                <button type="button" className="queryAgentButton" onClick={this.handleQueryAgent}>Query Agent</button>
                <button type="button" className="startListeningButton" onClick={this.handleStartListening}>Start Listening</button>
                <button type="button" className="stopListeningButton" onClick={this.handleStopListening}>Stop Listening</button>
                <button type="button" className="getContextButton" onClick={this.getCurrentContext}>Get Context</button>
                <button type="button" className="deleteContextButton" onClick={this.deleteCurrentContext}>Delete Context</button>
                <div className="qbResponse">
                    <h2>QB Says: {this.state.agentResponse} </h2>
                </div>
            </div>
        );
    }
}