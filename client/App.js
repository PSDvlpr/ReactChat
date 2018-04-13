import React, { Component } from 'react';
import io from 'socket.io-client';

import styles from './App.css';

import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {users: [], messages: [], text: '', name: ''};
    }

    // nasłuchiwanie, po załadowaniu DOM  na zdarzenia message i update //
    componentDidMount() {
        socket.on('message', message => this.messageReceive(message));
        socket.on('update', ({users}) => this.chatUpdate(users));
    }

    componentWillUnmount() {
        socket.removeListener('message');
        socket.removeListener('update');
    }

    messageReceive(message) {
        const messages = [message, ...this.state.messages];
        this.setState({messages});
    }

    chatUpdate(users) {
        this.setState({users});
    }

    // obsługa wysłania wiadomości //
    handleMessageSubmit(message) {
        const messages = [message, ...this.state.messages];
        this.setState({messages});
        socket.emit('message', message);
    }

    handleUserSubmit(name) {
        this.setState({name});
        socket.emit('join', name);
    }

    render() {
        return this.state.name !== '' ? this.renderLayout() : this.renderUserForm()
    }

    renderLayout() {
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}>
                        ChatApp
                    </div>
                    <div className={styles.AppRoom}>
                        Welcome <br/>
                        {this.state.name}
                    </div>
                </div>
                <div className={styles.AppBody}>
                    <UsersList
                        users={this.state.users}
                    />
                    <div className={styles.MessageWrapper}>
                        <MessageList
                            messages={this.state.messages}
                        />
                        <MessageForm
                            onMessageSubmit={message => this.handleMessageSubmit(message)}
                            name={this.state.name}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderUserForm() {
        return (
            <UserForm onUserSubmit={name => this.handleUserSubmit(name)} />
        );
    }
};

export default App;
