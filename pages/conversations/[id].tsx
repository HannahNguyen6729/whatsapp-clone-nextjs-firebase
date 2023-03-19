import React from "react";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../../config/firebase";
import { Conversation } from "@/types/type";
import { getRecipientEmail } from "../../utils/getRecipientEmail";
import { generateQueryMessages } from "@/utils/getMessagesInConversation";

const StyledContainer = styled.div`
  display: flex;
`;

const StyledConversationContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
  height: 100vh;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Conversation = ({
  conversation,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [userLoggedIn, __loading, __error] = useAuthState(auth);
  return (
    <StyledContainer>
      <Head>
        <title>
          conversation with
          {getRecipientEmail(conversation.users, userLoggedIn)}
        </title>
      </Head>
      <h1>messages</h1>
    </StyledContainer>
  );
};

export default Conversation;

export const getServerSideProps: GetServerSideProps<
  { conversation: Conversation }, //  type returned inside props:{} of the function
  { id: string }
> = async (context) => {
  const conversationId = context.params?.id;

  //get conversation to know who we are chatting with
  //read data--> get data
  const conversationRef = doc(db, "conversations", conversationId as string);
  //get 1 document
  const conversationSnapshot = await getDoc(conversationRef);

  //get all messages between user loggedIn and recipient in this conversation
  const queryMessage = generateQueryMessages(conversationId);
  //get many documents
  const messageSnapshot = await getDocs(queryMessage);

  return {
    props: {
      conversation: conversationSnapshot.data() as Conversation,
    },
  };
};
