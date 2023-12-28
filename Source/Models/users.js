const { connectToDatabase } = require('../Config/config');

const insertOneUser = async (document) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        const existingUser = await collection.findOne({ phone: document.phone });

        if (existingUser) {
            console.log('User with phone number already exists. Not inserting.');
        } else {
            const result = await collection.insertOne(document);
            console.log('User inserted successfully');
        }
    } catch (error) {
        console.error('Error inserting User:', error);
    }
}

const deleteOneUser = async (value) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const fieldName = 'phone';
        const filter = { [fieldName]: value };
        console.log(filter);

        const result = await collection.deleteOne(filter);
        console.log('One User Deleted Successfully');
    } catch (error) {
        console.error('Error Deleting One User: ', error);
    }
}

const showLoginUser = async (userPhoneNumber) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        const filter = { phone: userPhoneNumber };

        const document = await collection.findOne(filter);
        return document;
    } catch (error) {
        console.error('Error Retrieving Login User:', error);
    }
}


const showAllUser = async (phone) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        const filter = { phone: { $ne: phone } };

        const documents = await collection.find(filter).sort('name').toArray();
        return documents;
    } catch (error) {
        console.error('Error Retrieving User:', error);
    }
}

module.exports = {
    insertOneUser,
    deleteOneUser,
    showLoginUser,
    showAllUser
}