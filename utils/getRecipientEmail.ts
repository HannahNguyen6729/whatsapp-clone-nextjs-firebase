import { Conversation } from "@/types/type";
import { User } from "firebase/auth";

export const getRecipientEmail = (
  conversationUsers: Conversation["users"],
  loggedInUser?: User | null
) => conversationUsers.find((userEmail) => userEmail !== loggedInUser?.email);
