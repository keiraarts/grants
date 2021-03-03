const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicant = {
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    countryCode: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true
    },
    website: {
        type:  String,
        trim:  true,
        required: true
    },
    twitter: {
        type:  String,
        trim:  true,
        required: true
    },
    instagram: {
        type:  String,
        trim:  true,
    },
    statement: {
        type:  String,
        trim:  true,
        required: true
    },
    additional: {
        type:  String,
        trim:  true,
    },
    art:  {
        type:  String,
    },
    description: {
        type:  String,
    },
    minted: {
        type:  Boolean,
    },
    thumbnail:  String,
    removed: {
        type: Boolean,
        default: false
    },
    flagged: [{
        id: {
            type:     String,
        },
        user: {
            type:     mongoose.Schema.ObjectId,
            ref:      'User',
        },
        type: {
            type:  String,
            trim:  true,
        },
        message: {
            type:     String,
        }
    }],
    approvalCount: {
        type:     Number,
        default:  0,
    },
    rejectCount: {
        type:     Number,
        default:  0,
    },
    approved: [{
        user: {
            type:     mongoose.Schema.ObjectId,
            ref:      'User',
        },
    }],
    rejected: [{
        user: {
            type:     mongoose.Schema.ObjectId,
            ref:      'User',
        },
    }],
    user: {
        type:     mongoose.Schema.ObjectId,
        ref:      'User',
    },
};

const ApplicantSchema = new Schema(applicant);

ApplicantSchema.set('toJSON', {
    getters:  true,
    virtuals: true
});

mongoose.model('Applicant', ApplicantSchema);
