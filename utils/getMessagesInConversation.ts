import { db } from "@/config/firebase";
import { query, collection, where, orderBy } from "firebase/firestore";

export const generateQueryMessages = (conversationId?: string) =>
  query(
    collection(db, "messages"),
    where("conversation_id", "==", conversationId),
    orderBy("sent_at")
  );
