import { nanoid } from 'nanoid';
import type { LaneMessage } from '../../shared/types';

export class MessageBusService {
  private readonly messages: LaneMessage[] = [];

  addMessage(message: Omit<LaneMessage, 'id' | 'createdAt'>): LaneMessage {
    const full: LaneMessage = { ...message, id: nanoid(), createdAt: new Date().toISOString() };
    this.messages.push(full);
    return full;
  }

  listMessages(projectId: string): LaneMessage[] {
    return this.messages.filter((message) => message.projectId === projectId);
  }
}
