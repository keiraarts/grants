const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const approval = {
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
};

const ApprovalSchema = new Schema(approval);

ApprovalSchema.set('toJSON', {
    getters:  true,
    virtuals: true
});

mongoose.model('Approval', ApprovalSchema);
