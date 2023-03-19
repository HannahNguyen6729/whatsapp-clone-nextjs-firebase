import { Avatar, Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import * as EmailValidator from "email-validator";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Conversation } from "@/types/type";

const StyledContainer = styled.div`
  height: 100vw;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  border-right: 2px solid whitesmoke;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  position: sticky;
  top: 0;
  border-bottom: 1px solid whitesmoke;
  padding: 15px 0;
  height: 50px;
  width: 100%;
  background-color: whitesmoke;
`;
const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-radius: 2px;
`;
const StyledSidebarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`;
const StyledUserAvatar = styled(Avatar)`
  cursor: pointer;
  hover: {
    opacity: 0.8;
  }
`;
const StyledSearchIput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;

const SideBar = () => {
  const [userLoggedIn, loading, error] = useAuthState(auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  const signOutFunc = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("error logging out", error);
    }
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
    if (!openDialog) setRecipientEmail("");
  };

  const handleCloseDialog = () => setOpenDialog(false);

  //check if the conversation already exists between the current user loggedIn and the user invited
  const queryGetConversationsForCurrentUser = query(
    collection(db, "conversations"),
    where("users", "array-contains", userLoggedIn?.email)
  );

  const [conversationsSnapshot, __loading, __error] = useCollection(
    queryGetConversationsForCurrentUser
  );

  const isConversationAlreadyExists = (recipientEmail: string) =>
    conversationsSnapshot?.docs.find((conversation) =>
      (conversation.data() as Conversation).users.includes(recipientEmail)
    );

  const isInvitingSelf = recipientEmail === userLoggedIn?.email;
  const handleCreateDialog = async () => {
    if (!recipientEmail) return;
    //logic: if email is validated, don't invite yourself, conversation is not existed
    if (
      EmailValidator.validate(recipientEmail) &&
      !isInvitingSelf &&
      !isConversationAlreadyExists(recipientEmail)
    ) {
      //add conversation to database 'conversations' collection
      // a conversation is between the current loggedIn user and the user invited
      await addDoc(collection(db, "conversations"), {
        users: [userLoggedIn?.email, recipientEmail],
      });
    }

    handleCloseDialog();
    console.log("create dialog");
  };

  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title={userLoggedIn?.email as string} placement="right">
          <StyledUserAvatar src={userLoggedIn?.photoURL || ""} />
        </Tooltip>
        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton onClick={signOutFunc}>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyledHeader>
      <StyledSearch>
        <SearchIcon />
        <StyledSearchIput placeholder="search in conversation"></StyledSearchIput>
      </StyledSearch>
      <StyledSidebarButton onClick={handleClickOpenDialog}>
        Start a new conversation
      </StyledSidebarButton>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>New conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter an Google email address for the user you want to chat
            with
          </DialogContentText>
          <TextField
            name="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            autoFocus
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button disabled={!recipientEmail} onClick={handleCreateDialog}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* List of conversations */}
    </StyledContainer>
  );
};

export default SideBar;
