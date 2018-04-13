class MessageService {
    constructor() {
        this.messages = [];
    }

    getAllMessages() {
        return this.messages;
    }

    addMessage(message) {
        message ? this.messages = [...this.messages, message] : this.messages;
    }
}

module.exports = MessageService;
