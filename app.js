var url = `https://api.covid19india.org/data.json`

fetch(url).then(response => response.json()
  .then(data => {
    console.log(data);

    var total_confirmed, total_active, total_recovered, total_deaths

    var state = []
    var confirmed = []
    var active = []
    var recovered = []
    var deaths = []

    $.each(data.statewise, function (id, object) {
      state.push(object.state)
      confirmed.push(object.confirmed)
      active.push(object.active)
      recovered.push(object.recovered)
      deaths.push(object.deaths)
    })

    // remove first element from the array
    state.shift()
    confirmed.shift()
    active.shift()
    recovered.shift()
    deaths.shift()

    console.log(state)


    total_active = data.statewise[0].active
    total_confirmed = data.statewise[0].confirmed
    total_recovered = data.statewise[0].recovered
    total_deaths = data.statewise[0].deaths

    $("#active").append(total_active)
    $("#confirmed").append(total_confirmed)
    $("#recovered").append(total_recovered)
    $("#deaths").append(total_deaths)

    var Chartdata = document.getElementById("covidChart").getContext('2d')

    var chart = new Chart(Chartdata, {
      type: "line",
      data: {
        labels: state,
        datasets: [
          {
            label: "Confirmed Cases",
            data: confirmed,
            backgroundColor: "#f1c40f",
            minBarLength: 100
          },
          {
            label: "Active Cases",
            data: active,
            backgroundColor: "#3357ff",
            minBarLength: 100
          },
          {
            label: "Recovered Cases",
            data: recovered,
            backgroundColor: "#2ecc71",
            minBarLength: 100
          },
          {
            label: "Deceased",
            data: deaths,
            backgroundColor: "#e74c3c",
            minBarLength: 100
          }
        ]
      },
      options: {}
    })
  })
)
