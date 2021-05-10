<html lang="en-us">
    <title>EV Simulation Results</title>
    <link rel="icon" href="carClipart.png" type="image/jpg" size="16x16">
	<div style="background: rgba(255,255,255,.7); border: 1px solid black; margin: 5px; padding: 10px; display: inline-block; font-weight: bold;">
	<?php
		require 'evAnalyze.php';

		$totPeople = $_POST['population'];
		$evPercent = $_POST['population%'];
		$evPeople = round($totPeople*($evPercent/100));
		$season = $_POST['season'];
		// $smooth = $_POST['smooth'];
		echo 'Temperature: ';
		if($season=='average') {echo 'Average (75&#8457)<br>';}
		else if($season=='summer') {echo 'Summer (95&#8457)<br>';}
		else if($season=='winter') {echo 'Winter (20&#8457)<br>';}
		echo 'Percent Electric Vehicles: '.$evPercent.'%<br>';
		echo 'Number of Households: '.$totPeople.'<br>';
		echo 'Number of Electric Vehicles Households: '.$evPeople.'<br>';
		echo '-----------------------------------------<br>';
		$evMult = new EVAnalyze($evPeople, $season, $totPeople);
		echo '-----------------------------------------<br>';
		$evSingle = new EVAnalyze(1, $season, 1);
		//echo '-----------------------------------------<br>';
	?>
	</div>
	<head>
		<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
		<script type="text/javascript">
		  google.charts.load('current', {'packages':['corechart', 'bar']});
		  google.charts.setOnLoadCallback(multiCurveChart);
		  google.charts.setOnLoadCallback(singleCurveChart);
		  google.charts.setOnLoadCallback(barChart);
		
		  function multiCurveChart() {
			var data = google.visualization.arrayToDataTable(<?php echo $evMult->graphArray();?>);

			var options = {
			  title: 'Power Consumed by Ev\'s: '+<?php echo '\''.(number_format(round($evMult->totPower, 2))).'\'';?>+' kWh costing $'+<?php echo '\''.number_format(round(($evMult->totPower*.11), 2)).'\'';?>,
			  subtitle: 'Total Cost: $'+<?php echo '\''.number_format(round(($evMult->totPower*.11), 2)).'\'';?>,
			  hAxis: {title: 'Hour'},
			  vAxis: {	title: 'kWh',
						viewWindow:{
						min:0
						}
					 },
			  
			  //< ?php if ($smooth) {echo 'curveType: \'function\',';} ?>
			  curveType: 'function',
			  legend: { position: 'bottom' }
			};

			var chart = new google.visualization.LineChart(document.getElementById('curve_chart_multiple'));

			chart.draw(data, options);
		  }

		  function barChart() {
			var data = google.visualization.arrayToDataTable(<?php echo $evMult->graphArray();?>);

			var options = {
			  chart: {
				title: 'Power Consumed by EV\'s: '+<?php echo round($evMult->totPower, 2);?>,
				subtitle: 'Total Cost: $'+<?php echo (round(($evMult->totPower*.11), 2));?>,
				hAxis: {title: 'Hour'},
				vAxis: {title: 'kWh',
							viewWindow:{
								min:0
							}
						},
				legend: { position: 'none' }
			  },
			  bars: 'vertical' // Required for Material Bar Charts.
			};

			var chart = new google.charts.Bar(document.getElementById('barchart_material'));

			chart.draw(data, google.charts.Bar.convertOptions(options));
		  }

		  function singleCurveChart() {
			var data = google.visualization.arrayToDataTable(<?php echo $evSingle->graphArray();?>);

			var options = {
			  title: 'Single Power Consumed: '+<?php echo round($evSingle->totPower, 2);?>+' kWh costing $'+<?php echo (round(($evSingle->totPower*.11), 2));?>,
			  subtitle: 'Total Cost: $'+<?php echo (round(($evSingle->totPower*.11), 2));?>,
			  hAxis: {title: 'Hour'},
			  vAxis: {title: 'kWh',
						viewWindow:{
							min:0
						}
					},
			  //< ?php if ($smooth) {echo 'curveType: \'function\',';} ?>
			  legend: { position: 'bottom' }
			};

			var chart = new google.visualization.LineChart(document.getElementById('curve_chart_single'));

			chart.draw(data, options);
		  }
		</script>
	</head>
	<body>
		<div id="curve_chart_multiple" style="width: 900px; height: 500px"></div>
		<div id="curve_chart_single" style="width: 900px; height: 500px"></div>
		<style>
			html {
				background: url("carClipart.png") no-repeat center center fixed; 
				-webkit-background-size: cover;
				-moz-background-size: cover;
				-o-background-size: cover;
				background-size: cover;
				filter: alpha (opacity=0);
			}
		</style>
	</body>
</html>
