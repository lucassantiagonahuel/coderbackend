import {messageModel} from "../models/message.js";

export class MessageClass {
  constructor() {}

  getMessages = async () => {
    const response = await messageModel.find();
    return response;
  };

  addMessage = async (message) => {
    const response = await messageModel.create(message);
    return response;
  };
}
