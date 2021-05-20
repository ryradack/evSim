<?php

require 'vehicle.php';

class owner {
	var $carNumber;
	var $vehType;
	var $plugTime;
	var $totalBatt;
	var $ranGas = false;
   	var $currCharge;
	var $season;
	var $eff;
	var $dailyMiles;
	
	function __construct($season) {
		// This chooses the number of vehicles
		$d = rand(0,100);
		if($d<=97) {$this->carNumber = 1;}
		else{$this->carNumber = 2;}
		$this->eff = $this->purebell(.7,1.3,.1,.01);
		$this->vehType = new vehicle();
		
		//http://www.newsmax.com/SciTech/electric-car-batteries-temperature/2014/03/20/id/560870/
		// Set the battery life percentage usage by season according to the link above
		if($season=='summer') {
			$this->season = 1.52174;
		} else if($season=='average') {
			$this->season = 1;
		} else if($season=='winter') {
			$this->season = 2.44186;
		}

		// This sets the plug in time between 4 PM and 9 PM.
		$this->plugTime = (rand(0,5)+16);
		$this->getTotalBattery();

	}
	
	function getTotalBattery() {
		// The first part calculates the random number of miles that the
		// owner drove that day. According to the site below, about 40 miles
		// per day is average. This then adds up to +-5 miles.
		// https://www.fhwa.dot.gov/ohim/onh00/bar8.htm
		$d = rand(0,1000000000)/200000000;//float between 0 and 5
		$e = rand(0,1000000000)/1000000000;//between 0 and 1
		$evRange = $this->vehType->getMaxMilesEV();
		$dailyMiles = 41.1;
		if($e>.5) {$dailyMiles += $d;}
		else{$dailyMiles -= $d;}
		$dailyMiles = $dailyMiles*$this->season;
		$dailyMiles = $dailyMiles/($this->eff);
		$this->dailyMiles = $dailyMiles;
		// The next step is to compare it to the battery life. If the miles driven are farther than the
		// electric range, set ranGas to TRUE and set battery to 0. Else, calculate what percentage of
		// the battery is left, and set the totalBatt to that.
		if($evRange < $dailyMiles) {
			$this->ranGas = true;
			$this->totalBatt = $this->vehType->getBattSize()*$this->carNumber;
            		$this->currCharge = 0;
		}
		else {
            		$totalBatt = $this->totalBatt;
			$percentBatt = $dailyMiles/$this->vehType->getMaxMilesEV();
			$this->ranGas = false;
		}
		
	}
	
	function getChargeHour($hour) {
		$currCharge = $this->totalBatt*$this->carNumber;
		$chargePerHour = $this->carNumber*($this->vehType->getBattSize()/$this->vehType->getChargeTime());
		//set currCharge of vehicles
		if($hour<$this->plugTime) {
			$currCharge = (24-$this->plugTime+$hour)*$chargePerHour;
		}
		else if($hour>=$this->plugTime) {
			$currCharge = ($hour - $this->plugTime + 1)*$chargePerHour;
		}
		
		if($currCharge>$this->vehType->getBattSize()*$this->carNumber) {return 0;}
		else {return $chargePerHour;}
	}

	function getVehType() {
		return $this->vehType->getName();
	}
	
	function getCarNum() {
		return $this->carNumber;
	}
	function getDailyMiles(){
		return $this->dailyMiles;
	}
	function getPlugTime(){
		return $this->plugTime;
	}
	function getEff(){
		return $this->eff;
	}
	function getRanGas(){
		return $this->ranGas;
	}
	
	function purebell($min,$max,$std_deviation,$step=.01) {
		$rand1 = (float)mt_rand()/(float)mt_getrandmax();
		$rand2 = (float)mt_rand()/(float)mt_getrandmax();
		$gaussian_number = sqrt(-2 * log($rand1)) * cos(2 * M_PI * $rand2);
		$mean = ($max + $min) / 2;
		$random_number = ($gaussian_number * $std_deviation) + $mean;
		$random_number = round($random_number / $step) * $step;
		if($random_number < $min || $random_number > $max) {
			$random_number = $this->purebell($min, $max,$std_deviation);
		}
		return $random_number;
	}
}

?>
