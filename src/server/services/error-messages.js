const errorMessage = 'Server error, bummer! Please e-mail info@cue.dj';

exports.parse = (err) => {
    let message = '';
    if (err.code) {
        message = errorMessage;
    } else {
        Object.keys(err.errors).forEach((errName) => {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        });
    }

    return message;
};
