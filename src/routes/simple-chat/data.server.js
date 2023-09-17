import { EventEmitter } from 'node:events';

/**
 * @typedef {object} Chat
 * @property {string} user
 * @property {string} message
 * @property {'join' | 'message'=} type
 */

/** @type {Chat[]} */
export const chats = [];

export class ChatEvent extends EventEmitter {
	notify() {
		this.emit('chat');
	}
}

/**  @type {ChatEvent[]} */
export const chat_events = [];

/** @param {Chat} chat */
export function send_chat(chat) {
	chats.push(chat);
	for (const event of chat_events) {
		event.notify();
	}
}
