import { Avatar, Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

import React from "react";
import styled from "styled-components";

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
  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title="User avatar" placement="right">
          <StyledUserAvatar />
        </Tooltip>
        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyledHeader>
      <StyledSearch>
        <SearchIcon />
        <StyledSearchIput placeholder="search in conversation"></StyledSearchIput>
      </StyledSearch>
      <StyledSidebarButton>Search in conversation </StyledSidebarButton>
      {/* List of conversations */}
    </StyledContainer>
  );
};

export default SideBar;
