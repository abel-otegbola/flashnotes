import { Account, Client, Databases } from "appwrite";

const client = new Client();

client
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("");

export const account = new Account(client)
export const databases = new Databases(client)