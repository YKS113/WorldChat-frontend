import React, { useState } from 'react';
import styled from 'styled-components';
import ListItem from './ChatListItem';
import { useChatContext } from '../../context/ChatContext';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

function ChatContactList() {
  const { contacts, handleChatSelect } = useChatContext();
  const [display, setDisplay] = useState({
    rooms: true,
    users: true
  });

  const contactGroups = contacts.reduce(
    (prev, curr) => {
      curr?.chatType === 'room' ? prev.rooms.push(curr) : prev.users.push(curr);
      return prev;
    },
    {
      rooms: [],
      users: []
    }
  );

  const handleToggleDisplay = (key) => {
    setDisplay((prev) => ({ ...prev, [key]: !display[key] }));
  };

  const renderedGroups = Object.entries(contactGroups).map(([key, values]) => {
    const renderedContacts = values.map((contact) => {
      const { _id, avatarImage, ...otherContact } = contact;
      // console.log(otherContact);
      return (
        <ListItem
          key={_id}
          contactId={_id}
          avatarImage={avatarImage ? `data:image/svg+xml;base64, ${avatarImage}` : '/user.png'}
          handleItemClick={(e) => handleChatSelect(contact)}
          {...otherContact}
        />
      );
    });

    return (
      <>
      <GroupTitle onClick={() => handleToggleDisplay(key)}>
          {key}
          {display[key] ? <BiChevronDown /> : <BiChevronUp />}
        </GroupTitle>
      <ListGroup key={key}>
        {display[key] ? renderedContacts : null}
      </ListGroup>
      </>
    );
  });

  return <List>{renderedGroups}</List>;
}

const List = styled.div`
  width: 100%;
  max-width: 480px;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    background-color: var(--bg-color-main);
    width: 6px;
    &-thumb {
      background-color: var(--bg-color-darken);
      border-radius: 8px;
    }
  }
`;

const ListGroup = styled.ul`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  /* div{
    flex-direction: column-reverse;
    position: relative;
  } */
`;

const GroupTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: var(--main-color);
  align-self: flex-start;
  /* margin-bottom: 4px; */
  margin: 1rem 1rem 0 1rem;
  text-transform: capitalize;
  cursor: pointer;
`;

export default ChatContactList;
