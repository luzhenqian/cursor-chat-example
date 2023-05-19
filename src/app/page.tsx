"use client";

import { createPresence } from "@yomo/presence";
import CursorChat from "@yomo/react-cursor-chat";
import dynamic from "next/dynamic";
import "@yomo/react-cursor-chat/dist/style.css";

const user = {
  ID: "spiderman",
  Name: "Peter Parker",
  avatar: "https://i.pravatar.cc/150?img=3",
};

let url = process.env.NEXT_PUBLIC_PRESENCE_URL || "https://lo.yomo.dev:8443/v1";
const presence = createPresence(url, {
  publicKey: process.env.NEXT_PUBLIC_PRESENCE_PUBLIC_KEY,
  id: user.ID,
  autoDowngrade: true, // downgrade to websocket automatically if webTransport not work
});

const App = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <div className="main">
      <p className="tips">
        Press <span>/</span> to bring up the input box <br /> Press{" "}
        <span>ESC</span> to close the input box
      </p>
      <CursorChat
        presence={presence}
        id={user.ID}
        name={user.Name}
        avatar={user.avatar}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
