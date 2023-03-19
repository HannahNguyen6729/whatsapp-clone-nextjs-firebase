import Head from "next/head";
import React from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import WhatsAppLogo from "../assets/whatsapplogo.png";
import styled from "styled-components";

const Login = () => {
  const StyledContainer = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: whitesmoke;
  `;

  const StyledLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  `;

  const StyledImageWrapper = styled.div`
    margin-bottom: 50px;
  `;
  return (
    <StyledContainer>
      <Head>
        <title>Login</title>
      </Head>
      <StyledLoginContainer>
        <StyledImageWrapper>
          <Image
            src={WhatsAppLogo}
            alt="Whatsapp Logo"
            height="200"
            width="200"
          />
        </StyledImageWrapper>
        <Button
          variant="outlined"
          onClick={() => {
            console.log("Signing in with Google");
          }}
        >
          Sign in with Google
        </Button>
      </StyledLoginContainer>
    </StyledContainer>
  );
};

export default Login;
