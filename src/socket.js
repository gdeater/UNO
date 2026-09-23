import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "https://wells-wind-britannica-potatoes.trycloudflare.com";
export const socket = io(SERVER_URL, { autoConnect: false });