const { v4: uuidv4 } = require('uuid');
const {
    createItem,
    queryItem,
} = require('../db/docClientActions');

const createSlot = async (req, res) => {
    try {
        var id = uuidv4();
        req = { ...req.body, "id": id };
        var params = {
            TableName: 'Bookings',
            Item: req,
        }
        await createItem(params);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const getSlotByEventId = async (req, res) => {
    try {
        const { eventId: eventId } = req.params;
        var params = {
            TableName: 'Bookings',
            KeyConditionExpression: 'eventId = :eid',
            ExpressionAttributeValues: {
                ':eid': eventId,
            },
        }
        const data = await queryItem(params);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    createSlot,
    getSlotByEventId,
}