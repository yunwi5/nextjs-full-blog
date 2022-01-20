import { MongoClient } from "mongodb";

const CONNECTION_STRING = `mongodb+srv://${process.env.mongodb_username}:${process.env
    .mongodb_password}@${process.env.mongodb_clustername}.ikxp6.mongodb.net/${process.env
        .mongodb_database}?retryWrites=true&w=majority`;

async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, message } = req.body;

        if (
            !email ||
            !email.includes("@") ||
            !name ||
            name.trim() === "" ||
            !message ||
            message.trim() === ""
        ) {
            res.status(422).json({ message: "Invalid input." });
            return;
        }

        // Store it in a database
        const newMessage = {
            email,
            name,
            message
        };

        let client;
        // Connect to database
        try {
            client = await MongoClient.connect(CONNECTION_STRING);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "Could not connect to a database" });
            return;
        }

        const db = client.db();
        try {
            const result = await db.collection("message").insertOne(newMessage);
            newMessage.id = result.insertedId;
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "Inserting data failed" });
            return;
        }

        client.close();

        res.status(201).json({
            message: "Successfully stored message!",
            data: newMessage
        });
    }
}

export default handler;
