import { Account, Client, Databases, TablesDB } from "appwrite";

const client = new Client();

client
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || "");

export const account = new Account(client)
export const databases = new Databases(client)
export const tablesDB = new TablesDB(client);