<?php

require 'owner.php';

class EVAnalyze {
//Defines list of owners, hours, and total kWh being used per hour
	var $evOwners;
	var $hours;
	var $carNumbers;
	var $carTypes;
   	var $totPower;
   	var $hourTotals;
	var $housePower;
 
	function __construct($numOwners, $season, $numPop) {
		$evOwners = array();
		$hours = array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23);
		$hourTotals = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		$carNumbers = array(0,0,0,0,0,0,0,0,0,0);
		$carTypes = array("Chevrolet Volt", "Nissan Leaf", "Tesla Model S",
 			"Toyota Prius PHV", "Ford Fusion Energi", "Ford C-Max Energi",
 			"BMW i3", "Fiat 500e", "Tesla Model X", "Volkswagen e-Golf");
		/// houshold averages 30 kWh per day https://www.eia.gov/tools/faqs/faq.php?id=97&t=3  10812/365=29.62kWh/day
		// hours for each season
		$housePower = array(1.3,1.3,1.2,1,1,1,1,1.2,1.3,1.3,1.2,1.1,1,1,1,1,1,1.3,1.5,1.7,1.8,1.7,1.6,1.5);
		if($season=='summer') {
			$housePower = array(1.2,1.1,0.9,0.8,0.8,0.8,1,1,1.1,1.2,1.2,1.2,1.3,1.3,1.4,1.4,1.5,1.6,1.7,1.8,1.7,1.4,1.3,1.3);
		} else if($season=='average') {
			$housePower = array(1.25,1.2,1.05,0.9,0.9,0.9,1,1.1,1.2,1.25,1.2,1.15,1.15,1.15,1.2,1.2,1.25,1.45,1.6,1.75,1.75,1.55,1.45,1.4);
		} else if($season=='winter') {
			$housePower = array(1.3,1.3,1.2,1,1,1,1,1.2,1.3,1.3,1.2,1.1,1,1,1,1,1,1.3,1.5,1.7,1.8,1.7,1.6,1.5);
		}
		
		// Multiplies the hourly power usage from $housePower by the number of homes 
		foreach($housePower as &$value){
			$value = $value * $numPop;
		}
		unset($value);
		
		$this->housePower = $housePower;
		$this->evOwners = $evOwners;
		$this->hours = $hours;
		$this->hourTotals = $hourTotals;
		$this->carNumbers = $carNumbers;
		$this->carTypes = $carTypes;		
		
		for($i=0;$i<$numOwners;$i++) {
			$this->evOwners[$i] = new owner($season);
		}
		
		//Calculates power per hour
		$this->calculateChargeTime();
		
		// Calculates the total power
		$totPower = 0;
		for($j=0;$j<=23;$j++) {$totPower += $this->hourTotals[$j];}
        $this->totPower = $totPower;
        
		// Calculates number of each vehicle
		$size = sizeof($this->evOwners);
		for($k = 0;$k<=9;$k++) {//loops through each car model
			for($l = 0; $l<$size; $l++) {// This loop goes through each owner
				$st = $this->evOwners[$l]->getVehType();
				if($st==$carTypes[$k]) {
					$this->carNumbers[$k] = $this->carNumbers[$k] + $this->evOwners[$l]->getCarNum();
				}
			}
			if($this->carNumbers[$k] != 0){
				echo $carTypes[$k].": ".$this->carNumbers[$k];
				echo '<br>';
			}
		}
		if($numPop == 1){
			echo "Drove ".round($this->evOwners[0]->getDailyMiles(),2)." miles per day <br>";
			echo "Plugged in at hour ".round($this->evOwners[0]->getPlugTime(),2)."<br>";
			echo "Driver drove with ".round($this->evOwners[0]->getEff(),2)." efficiency Multiplier <br>";
		}
	}
	
	function calculateChargeTime() {
        $evArraySize = sizeof($this->evOwners);
		
		for($i=0;$i<=23;$i++) {
			$kWh = 0;
			for($j=0; $j<$evArraySize; $j++) {
				$currTotal = $this->evOwners[$j]->getChargeHour($i);
				$kWh = $kWh + $currTotal;
			}
			$this->hourTotals[$i] = $kWh;
		}
	}

    //Function that returns the array with the graphable data
    function graphArray() {
      $hourTotals = $this->hourTotals;
		$hourPower = $this->housePower;
		$arr = '[[\'Hour\', \'Average Home Power\',\'Home with EV Power\'],
            [\'0\', '.$hourPower[0].', '.($hourPower[0] + $hourTotals[0]).'],
            [\'1\', '.$hourPower[1].', '.($hourPower[1] + $hourTotals[1]).'],
            [\'2\', '.$hourPower[2].', '.($hourPower[2] + $hourTotals[2]).'],
            [\'3\', '.$hourPower[3].', '.($hourPower[3] + $hourTotals[3]).'],
            [\'4\', '.$hourPower[4].', '.($hourPower[4] + $hourTotals[4]).'],
            [\'5\', '.$hourPower[5].', '.($hourPower[5] + $hourTotals[5]).'],
            [\'6\', '.$hourPower[6].', '.($hourPower[6] + $hourTotals[6]).'],
            [\'7\', '.$hourPower[7].', '.($hourPower[7] + $hourTotals[7]).'],
            [\'8\', '.$hourPower[8].', '.($hourPower[8] + $hourTotals[8]).'],
            [\'9\', '.$hourPower[9].', '.($hourPower[9] + $hourTotals[9]).'],
            [\'10\', '.$hourPower[10].', '.($hourPower[10] + $hourTotals[10]).'],
            [\'11\', '.$hourPower[11].', '.($hourPower[11] + $hourTotals[11]).'],
            [\'12\', '.$hourPower[12].', '.($hourPower[12] + $hourTotals[12]).'],
            [\'13\', '.$hourPower[13].', '.($hourPower[13] + $hourTotals[13]).'],
            [\'14\', '.$hourPower[14].', '.($hourPower[14] + $hourTotals[14]).'],
            [\'15\', '.$hourPower[15].', '.($hourPower[15] + $hourTotals[15]).'],
            [\'16\', '.$hourPower[16].', '.($hourPower[16] + $hourTotals[16]).'],
            [\'17\', '.$hourPower[17].', '.($hourPower[17] + $hourTotals[17]).'],
            [\'18\', '.$hourPower[18].', '.($hourPower[18] + $hourTotals[18]).'],
            [\'19\', '.$hourPower[19].', '.($hourPower[19] + $hourTotals[19]).'],
            [\'20\', '.$hourPower[20].', '.($hourPower[20] + $hourTotals[20]).'],
            [\'21\', '.$hourPower[21].', '.($hourPower[21] + $hourTotals[21]).'],
            [\'22\', '.$hourPower[22].', '.($hourPower[22] + $hourTotals[22]).'],
            [\'23\', '.$hourPower[23].', '.($hourPower[23] + $hourTotals[23]).']]';
    return $arr;
    }
 }

?>
