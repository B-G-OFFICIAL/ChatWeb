const { connectToDatabase } = require('../Config/config');

const insertOneChat = async (document) => {
    try
    {
        const db = await connectToDatabase();
        const collection = db.collection('chats');

        const result = await collection.insertOne(document);
        return result;
    }
    catch (error)
    {
        console.error('Error inserting document:', error);
    }
}

const insertManyChat = async (documents) => {
    try
    {
        const db = await connectToDatabase();
        const collection = db.collection('chats');

        const result = await collection.insertMany(documents);
        console.log('Document inserted Succesfully');
    }
    catch (error)
    {
        console.error('Error inserting document:', error);
    }
}

const deleteOneChat = async (fieldName, value) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('chats');
        const filter = { [fieldName]: value };
        console.log(filter);

        const result = await collection.deleteOne(filter);
        console.log('One Chat Deleted Successfully');
    } catch (error) {
        console.error('Error Deleting One Chat: ', error);
    }
}

const deleteOneSideChat = async (filters) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('chats');

        const result = await collection.deleteMany({ $and: filters });
    } catch (error) {
        console.error('Error Deleting Many Chats:', error);
    }
}

const deleteManyChatWithId = async (filters) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('chats');

        const result = await collection.deleteMany({ $or: filters });
    } catch (error) {
        console.error('Error Deleting Many Chats:', error);
    }
}

// const deleteAllChat = async () => {
//     try
//     {
//         const db = await connectToDatabase();
//         const collection = db.collection('chats');

//         const result = await collection.deleteMany({});
//         console.log('All Chat Deleted Succesfully');
//     }
//     catch (error)
//     {
//         console.error('Error Deleting All Chat: ', error);
//     }
// }

const showMixChat = async () => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('chats');

        const documents = await collection.find({}).sort('date').toArray();
        console.log('Retrieved Documents:', documents);
    } catch (error) {
        console.error('Error Retrieving Data:', error);
    }
}

const showUserWiseChat = async (value1, value2) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('chats');
        const filter = {
            $or: [
                { $and: [{ 'to': value1 }, { 'from': value2 }] },
                { $and: [{ 'to': value2 }, { 'from': value1 }] }
            ]
        };
        
        const documents = await collection.find(filter).sort('date').toArray();
        return documents;
    } catch (error) {
        console.error('Error Retrieving Data:', error);
    }
}

module.exports = {
    insertOneChat,
    insertManyChat,
    deleteOneChat,
    deleteOneSideChat,
    deleteManyChatWithId,
    //deleteAllChat,
    showMixChat,
    showUserWiseChat
}