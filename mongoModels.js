const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicant = {
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    countryCode: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    website: {
        type:  String,
        trim:  true,
    },
    twitter: {
        type:  String,
        trim:  true,
    },
    instagram: {
        type:  String,
        trim:  true,
    },
    statement: {
        type:  String,
        trim:  true,
    },
    additional: {
        type:  String,
        trim:  true,
    },
    art:  String,
    thumbnail:  String,
};

const ApplicantSchema = new Schema(applicant);

ApplicantSchema.set('toJSON', {
    getters:  true,
    virtuals: true
});

mongoose.model('Applicant', ApplicantSchema);
