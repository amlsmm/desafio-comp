const projectSchema = require('./../database/db.js');

module.exports = () => {
    const schema = projectSchema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    return schema;
}

