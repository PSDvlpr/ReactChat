import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io('/');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {users: [], messages: [], text: '', name: ''};
    }

    render() {
        return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
    }

    renderLayout()
};

export default App;