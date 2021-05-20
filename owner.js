class owner {
    constructor(season) {
        var d = Math.random();
        (d < .97) ? this.carNumber = 1 : this.carNumber = 2;
        this.eff = this.purebell(.7, 1.3, .1, .01);
        this.vehType = new vehicle();

        //http://www.newsmax.com/SciTech/electric-car-batteries-temperature/2014/03/20/id/560870/
		// Set the battery life percentage usage by season according to the link above
		if(season=='summer') {
			this.season = 1.52174;
		} else if(season=='average') {
			this.season = 1;
		} else if(season=='winter') {
			this.season = 2.44186;
		}

        // This sets the plug in time between 4 PM and 9 PM.
        this.plugTime = Math.random() * (5) + 16;
        this.getTotalBattery();
    }

    getTotalBattery() {
        // The first part calculates the random number of miles that the
		// owner drove that day. According to the site below, about 40 miles
		// per day is average. This then adds up to +-5 miles.
		// https://www.fhwa.dot.gov/ohim/onh00/bar8.htm
		var d = Math.random() * 5;//float between 0 and 5
		var e = Math.random();//between 0 and 1
		var evRange = this.vehType.getMaxMilesEV();
		var dailyMiles = 41.1;
		(e > .5) ? dailyMiles += d : dailyMiles -= d;
		dailyMiles = (dailyMiles * this.season)/(this.eff);
		this.dailyMiles = dailyMiles;
		// The next step is to compare it to the battery life. If the miles driven are farther than the
		// electric range, set ranGas to TRUE and set battery to 0. Else, calculate what percentage of
		// the battery is left, and set the totalBatt to that.
		if(evRange < dailyMiles) {
			this.ranGas = true;
			this.totalBatt = this.vehType.getBattSize() * this.carNumber;
       		this.currCharge = 0;
		}
		else {
       		// totalBatt = this.totalBatt;
			this.percentBatt = dailyMiles/this.vehType.getMaxMilesEV();
			this.ranGas = false;
		}
    }

    getChargeHour(hour) {
		var currCharge = this.totalBatt * this.carNumber;
		var chargePerHour = this.carNumber*(this.vehType.getBattSize()/this.vehType.getChargeTime());
		//set currCharge of vehicles
		if(hour < this.plugTime) {
			currCharge = (24-this.plugTime+hour) * chargePerHour;
		}
		else if(hour >= this.plugTime) {
			currCharge = (hour - this.plugTime + 1) * chargePerHour;
		}
		
		if(currCharge>this.vehType.getBattSize()*this.carNumber) {
            return 0;
        }
		else {
            return chargePerHour;
        }
	}

	getVehType() {
		return this.vehType.getName();
	}
	
	getCarNum() {
		return this.carNumber;
	}
	getDailyMiles(){
		return this.dailyMiles;
	}
	getPlugTime(){
		return this.plugTime;
	}
	getEff(){
		return this.eff;
	}
	getRanGas(){
		return this.ranGas;
	}
	
	purebell(min,max,std_deviation,step=.01) {
		var rand1 = Math.random();
		var rand2 = Math.random();
		var gaussian_number = Math.sqrt(-2 * Math.log(rand1)) * Math.cos(2 * Math.PI * rand2);
		var mean = (max + min) / 2;
		var random_number = (gaussian_number * std_deviation) + mean;
		random_number = parseInt(random_number / step) * step;
		if(random_number < min || random_number > max) {
			random_number = this.purebell(min, max,std_deviation);
		}
		return random_number;
	}
}