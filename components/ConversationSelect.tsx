import { Conversation } from "@/types/type";
import React from "react";
import styled from "styled-components";
import { useRecipient } from "../hooks/useRecipient";
import RecipientAvatar from "./RecipientAvatar";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-all;
  :hover {
    background-color: #e9eaeb;
  }
`;

const ConversationSelect = ({
  id,
  conversationUsers,
}: {
  id: string;
  conversationUsers: Conversation["users"];
}) => {
  const { recipientEmail, recipient } = useRecipient(conversationUsers);

  return (
    <StyledContainer>
      {/* {id}-{JSON.stringify(conversationUsers)} */}
      <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
      <span>{recipientEmail}</span>
    </StyledContainer>
  );
};

export default ConversationSelect;
