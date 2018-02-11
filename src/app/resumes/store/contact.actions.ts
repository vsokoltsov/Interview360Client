import { Action } from '@ngrx/store';

import { Contact } from '../contact.model';

export const ADD_CONTACT = 'ADD_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

export class AddContact implements Action {
  readonly type = ADD_CONTACT;

  constructor(public payload: Contact) {  }
}

export class RemoveContact implements Action {
  readonly type = REMOVE_CONTACT;

  constructor(public payload: Contact) {  }
}

export type ContactActions = AddContact | RemoveContact;
