import { connect } from "mongoose";
import "dotenv/config"

export const connectionURL = process.env.MONGO_URL;

export class ConnectMongoDB {
    static #instance;
    constructor() {
        connect(connectionURL);
    }

    static getInstance() {
        if (this.#instance) {
            console.log("ya estamos conectados a MongoDB");
            return this.#instance;
        } else {
            this.#instance = new ConnectMongoDB();
            console.log("Conectados a MongoDB")
            return this.#instance;
        }
    }
}