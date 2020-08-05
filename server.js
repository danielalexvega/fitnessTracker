const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs");

const PORT = process.env.PORT || 3000;

const Workout = require("./models/Workout.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });


// GET ALL THE WORKOUTS
app.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
});

//CREATE A WORKOUT
app.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

//UPDATE A WORKOUT
app.put("/api/workouts/:id", ({ body }, res) => {
    Workout.update(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        {
            $set: {
                date: body.date,
                exercise: {
                    type: body.type,
                    name: body.name,
                    duration: body.duration,
                    weight: body.weight,
                    reps: body.reps,
                    sets: body.sets,
                    distance: body.distance
                }
            }
        },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        }
    )
})



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})