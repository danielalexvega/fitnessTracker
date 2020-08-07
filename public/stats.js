// get all workout data from back-end

fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });


API.getWorkoutsInRange()

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
}



function populateChart(data) {
 
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let durationsByWorkout = durationByWorkout(data);
  let totalWeights = weightByWorkout(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durationsByWorkout
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed broken up by Duration (in minutes)"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: totalWeights
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed broken up by weight"
      }
    }
  });
}

function dates(data) {
  let dates = [];
  data.forEach(workout => {
    let day = new Date(workout.date);
    dates.push(day.getDay());
  });
  return dates;
}

function duration(data) {
  let durations = [0, 0, 0, 0, 0, 0, 0];

  data.forEach(workout => {
    let day = new Date(workout.date);
    let dayIndex = day.getDay();  
    workout.exercise.forEach(exercise => {
      let newDuration = durations[dayIndex] + exercise.duration;
      durations.splice(dayIndex, 1, newDuration);
    });
  });

  return durations;
}

function durationByWorkout(data) {
  let durations = [];

  data.forEach(workout => {
    workout.exercise.forEach(exercise => {
      durations.push(exercise.duration);
    });
  });

  return durations;
}

function calculateTotalWeight(data) {
  let total = [0, 0, 0, 0, 0, 0, 0];

  data.forEach(workout => {
    let day = new Date(workout.date);
    let dayIndex = day.getDay();
    workout.exercise.forEach(exercise => {
      let newWeight = total[dayIndex] + exercise.weight;
      total.splice(dayIndex, 1, newWeight);
    });
  });

  return total;
}

function weightByWorkout(data) {
  let total = [];
  
  data.forEach(workout => {
    workout.exercise.forEach(exercise => {
      total.push(exercise.weight);
    });
  });
  return total;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercise.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });

  return workouts;
}
