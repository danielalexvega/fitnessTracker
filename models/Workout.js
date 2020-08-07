const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    exercise: [{
        type: {
            type: String
        },
        name: {
            type: String
        },
        duration: {
            type: Number
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]
});

//add that function 

// WorkoutSchema.methods.totalDuration = function() {
//     let total = 0;
//     this.exercise.map(exercise => {
//         total = total + exercise.duration;
//     });
//     this.totalDuration = total;
// }

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;