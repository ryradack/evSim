var evMult;
var evSingle;
google.charts.load('current', {'packages':['corechart', 'bar']});

function checkForm() {
    var totPeople = document.forms["simForm"]["population"].value;
    var evPercent = document.forms["simForm"]["population%"].value;
    var season = document.forms["simForm"]["season"].value;
    if ( totPeople < 0 || isNaN(totPeople) || totPeople == "") {
        alert("Must be a positive number of People");
        return;
    } else if (evPercent > 100 || evPercent < 0 || isNaN(evPercent) || evPercent == "") {
        alert("Percentage of EV must be between 0 and 100");
        return;
    } else if (season != 'average' && season != 'summer' && season != 'winter') {
        alert("Must choose a season");
        return;
    } else {
        runSIM(totPeople, evPercent, season);   
    }
}

function runSIM(totPeople, evPercent, season) {
    var evPeople = parseInt(totPeople * (evPercent/100));

    evMult = new EVAnalyze(evPeople, season, totPeople);
    evSingle = new EVAnalyze(1, season, 1);

    reviewDisplay = document.getElementById("reviewResult")
    if(season == 'average')     {   reviewDisplay.innerHTML = 'Temperature: Average (75&#8457)'; } 
    else if (season == 'summer'){   reviewDisplay.innerHTML = 'Temperature: Summer (95&#8457)';  } 
    else                        {   reviewDisplay.innerHTML = 'Temperature: Winter (20&#8457)';  }

    reviewDisplay.innerHTML += '<br>Percent Electric Vehicles: ' + evPercent + '<br>Number of Households: ' + totPeople + '<br>Number of Electric Vehicle Households: ' + evPeople;
    
    document.getElementById("evMultResult").innerHTML = evMult.getCars();
    document.getElementById("evSingleResult").innerHTML = evSingle.getCars();

    multiCurveChart();
    singleCurveChart();

    var resultDiv = document.getElementById("results");
    resultDiv.style.display = "block";
}

function clearResults() {
    var resultDiv = document.getElementById("results");
    resultDiv.style.display = "none";
}

function multiCurveChart() {
    var data = google.visualization.arrayToDataTable(this.evMult.graphArray());

    var options = {
        title: 'Power Consumed by Ev\'s: '+ parseFloat(this.evMult.totPower).toFixed(2) +' kWh costing $'+ parseFloat(evMult.totPower * .11).toFixed(2),
        subtitle: 'Total Cost: $'+ parseFloat(this.evMult.totPower*.11).toFixed(2),
        hAxis: {title: 'Hour'},
        vAxis: {	title: 'kWh',
                viewWindow:{
                min:0
                }
                },
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_multiple'));

    chart.draw(data, options);
}

function singleCurveChart() {
    var data = google.visualization.arrayToDataTable(this.evSingle.graphArray());

    var options = {
        title: 'Single Power Consumed: '+ parseFloat(this.evSingle.totPower).toFixed(2) + ' kWh costing $'+ parseFloat(this.evSingle.totPower*.11).toFixed(2),
        subtitle: 'Total Cost: $'+ parseFloat(this.evSingle.totPower*.11).toFixed(2),
        hAxis: {title: 'Hour'},
        vAxis: {title: 'kWh',
                viewWindow:{
                    min:0
                }
            },
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_single'));

    chart.draw(data, options);
}
