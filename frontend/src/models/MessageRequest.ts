class MessageRequest {
    topic: string;
    question: string;

    constructor(topic: string, question: string) {
        this.topic = topic;
        this.question = question;
    }
}
export default MessageRequest;