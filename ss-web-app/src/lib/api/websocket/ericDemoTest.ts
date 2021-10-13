import { createTestEnv } from 'dependencies/test/createTestEnv';
import { MOCK_PERSON, PersonProps } from 'models';
import PhoneNumbers from 'modules/Utils/PhoneNumbers';

import {
  MOCK_CONTACTS,
  MOCK_CONTACT_DUPLICATED_PHONE_VARIANT,
} from './mockContacts';
import { MIN_SECONDS_BETWEEN_REFRESH } from './ContactBookStore';

const PERSON_IN_CONTACT_BY_RECORD_ID: PersonProps = {
  ...MOCK_PERSON,
  importRecordId: '410FE041-5C4E-48DA-B4DE-04C15EA3DBAC',
};

const PERSON_IN_CONTACT_BY_PHONE: PersonProps = {
  ...MOCK_PERSON,
  phoneNumber: '+18885555512',
};

describe('removes contacts that are people', () => {
  it('filters a contact by import record id', async () => {
    const { ContactBookStore } = (await createTestEnv()).env.uiStores;
    ContactBookStore.setContacts(MOCK_CONTACTS);

    const results = ContactBookStore.filteredContactList([
      PERSON_IN_CONTACT_BY_RECORD_ID,
    ]);
    const contactWithId = results.find(
      (contact) => contact.id === PERSON_IN_CONTACT_BY_RECORD_ID.importRecordId
    );
    expect(contactWithId).toBeUndefined();
  });

  it('filters a contact by phone number', async () => {
    const { ContactBookStore } = (await createTestEnv()).env.uiStores;
    ContactBookStore.setContacts(MOCK_CONTACTS);

    const results = ContactBookStore.filteredContactList([
      PERSON_IN_CONTACT_BY_PHONE,
    ]);

    const contactWithPhoneNumber = results.find(
      (contact) =>
        !!contact.phoneNumbers?.find((number) =>
          PhoneNumbers.areEqualWhenNormalized(
            number.number!,
            'us',
            PERSON_IN_CONTACT_BY_PHONE.phoneNumber,
            'us'
          )
        )
    );

    expect(contactWithPhoneNumber).toBeUndefined();
  });
});

describe('phone number normalization', () => {
  it('removes two variants of the same number', async () => {
    const { ContactBookStore } = (await createTestEnv()).env.uiStores;
    ContactBookStore.setContacts([MOCK_CONTACT_DUPLICATED_PHONE_VARIANT]);

    const results = ContactBookStore.filteredContactList([]);
    expect(results[0].normalizedPhoneNumbers).toHaveLength(1);
  });
});

describe('initial Load', () => {
  it('is false at first', async () => {
    const { ContactBookStore } = (await createTestEnv()).env.uiStores;
    ContactBookStore.refreshContacts();
    expect(ContactBookStore.isInitialLoadComplete).toBeFalsy();
  });

  it('is true once loaded', async () => {
    const { ContactBookStore } = (await createTestEnv()).env.uiStores;
    await ContactBookStore.refreshContacts();
    expect(ContactBookStore.isInitialLoadComplete).toBeTruthy();
  });
});

describe('only loads contact book when needed', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not refresh when called twice', async () => {
    const { ContactBookStore } = (await createTestEnv()).env.uiStores;
    ContactBookStore.refreshContacts();
    const result2 = await ContactBookStore.refreshContacts(); // Second call call before first has resolved
    expect(result2).toBeFalsy();
  });

  it('does not refresh when two quick calls made', async () => {
    const { ContactBookStore } = (await createTestEnv()).env.uiStores;
    const result1 = await ContactBookStore.refreshContacts();
    const result2 = await ContactBookStore.refreshContacts(); // Second call right after first
    expect(result1).toBeTruthy();
    expect(result2).toBeFalsy();
  });

  it('does refresh when delayed calls made', async () => {
    const { ContactBookStore } = (await createTestEnv()).env.uiStores;
    const mockDate1 = new Date(1466424490000);
    const mockDate2 = new Date(
      1466424490000 + MIN_SECONDS_BETWEEN_REFRESH * 1000 + 1000
    );
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate1 as any);
    const result1 = await ContactBookStore.refreshContacts();
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate2 as any);
    const result2 = await ContactBookStore.refreshContacts(); // Second call before first has resolved
    expect(result1).toBeTruthy();
    expect(result2).toBeTruthy();
  });
});
