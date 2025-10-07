class MessageModel{
    id?: string;
    topic: string;
    question: string;
    response?: string;
    closed?: boolean;
    applicantEmail?: string;
    adminEmail?: string;

    constructor(topic: string, question: string){
        this.topic = topic;
        this.question = question;
    }
}
export default MessageModel;