const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizer = {
    admins: [{
        type:     mongoose.Schema.ObjectId,
        ref:      'User',
    }],
    name: {
        type:  String,
        trim:  true,
        required: true,
    },
    url: {
        type:  String,
        trim:  true,
        required: true,
    },
    logo: {
        type: String,
    },
    about: {
        type:  String,
        trim:  true,
        required: true,
    },
    email: {
        type:  String,
        trim:  true,
        required: true,
    },
    website: {
        type:  String,
        trim:  true,
        required: true,
    },
    twitter: {
        type:  String,
        trim:  true,
    },
    instagram: {
        type:  String,
        trim:  true,
    },
    wallet: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false
    }
}


const OrganizerSchema = new Schema(organizer);

OrganizerSchema.set('toJSON', {
    getters:  true,
    virtuals: true
});

mongoose.model('Organizer', OrganizerSchema);



const program = {
    organizers: [{
        type:     mongoose.Schema.ObjectId,
        ref:      'Organizer',
    }],
    name: {
        type:  String,
        trim:  true,
        required: true,
    },
    url: {
        type:  String,
        trim:  true,
        required: true,
    },
    description: {
        type:  String,
        trim:  true,
        required: true,
    },
    logistics: {
        type:  String,
        trim:  true,
        required: true,
    },
    criteria: {
        type:  String,
        trim:  true,
        required: true,
    },
    curators: [{
        type:     mongoose.Schema.ObjectId,
        ref:      'User',
    }],
    active: { // Shown in application list
        type:    Boolean,
        default: false,
    },
    isProtected: {
        type: Boolean,
        default: false
    },
    passcode: {
        type: String,
    },
    open: {
        type: Date,
    },
    close: {
        type: Date,
    },
    perpetual: {
        type: Boolean,
        default: false
    },
    passByVotes: {
        type: Boolean,
        default: true,
    },
    blindVoting: {
        type: Boolean,
        default: true,
    },
    topThreshold: {
        type: Number,
        default: 10,
    },
    voteThreshold: {
        type: Number,
        default: 3,
    },
    contractAddress: {
        type: String
    },
    mintToArtist: {
        type: Boolean,
        default: false,
    },
    curatorAddress: {
        type: String
    },
    mintInProgress: {
        type: Boolean,
    }
}

const ProgramSchema = new Schema(program);

ProgramSchema.set('toJSON', {
    getters:  true,
    virtuals: true
});

mongoose.model('Program', ProgramSchema);







const programApplicant = {
    user: {
        type:     mongoose.Schema.ObjectId,
        ref:      'User',
        required: true
    },
    program: {
        type:     mongoose.Schema.ObjectId,
        ref:      'Program',
        required: true
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
    title: {
        type:  String,
        required: true,
    },
    description: {
        type:  String,
        required: true,
    },
    art:  {
        type:  String,
        required: true,
    },
    artWeb: {
        type:  String,
        required: true,
    },
    ineligible: {
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
    emailed: {
        type: Boolean,
        default: false
    },
    accepted: {
        type: Boolean,
        default: false
    },
    finalized: {
        type: Boolean,
        default: false,
    },
    published: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number
    },
    arweave: {
        type: String,
    }
};

const ProgramApplicantSchema = new Schema(programApplicant);

ProgramApplicantSchema.set('toJSON', {
    getters:  true,
    virtuals: true
});

mongoose.model('ProgramApplicant', ProgramApplicantSchema);
