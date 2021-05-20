class EVAnalyze {
    constructor(numOwners, season, numPop) {
        var evOwners = [];
        var hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        var hoursTotals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var carNumbers = [0,0,0,0,0,0,0,0,0,0];
        var carTypes = ["Chevrolet Volt", "Nissan Leaf", "Tesla Model S",
                        "Toyota Prius PHV", "Ford Fusion Energi", "Ford C-Max Energi",
                        "BMW i3", "Fiat 500e", "Tesla Model X", "Volkswagen e-Golf"];
        /// houshold averages 30 kWh per day https://www.eia.gov/tools/faqs/faq.php?id=97&t=3  10812/365=29.62kWh/day
		// hours for each season
		var housePower = [1.3,1.3,1.2,1,1,1,1,1.2,1.3,1.3,1.2,1.1,1,1,1,1,1,1.3,1.5,1.7,1.8,1.7,1.6,1.5];
        if(season == "summer") {
            housePower = [1.2,1.1,0.9,0.8,0.8,0.8,1,1,1.1,1.2,1.2,1.2,1.3,1.3,1.4,1.4,1.5,1.6,1.7,1.8,1.7,1.4,1.3,1.3];
        } else if (season == "average") {
            housePower = [1.25,1.2,1.05,0.9,0.9,0.9,1,1.1,1.2,1.25,1.2,1.15,1.15,1.15,1.2,1.2,1.25,1.45,1.6,1.75,1.75,1.55,1.45,1.4];
        } else if (season == "winter") {
            housePower = [1.3,1.3,1.2,1,1,1,1,1.2,1.3,1.3,1.2,1.1,1,1,1,1,1,1.3,1.5,1.7,1.8,1.7,1.6,1.5];
        }

        for(var l = 0; l < 24; l++) {
            housePower[l] *= numPop;
        }

        this.numPop = numPop;
        this.housePower = housePower;
		this.evOwners = evOwners;
		this.hours = hours;
		this.hoursTotals = hoursTotals;
		this.carNumbers = carNumbers;
		this.carTypes = carTypes;		
		
        for(var i = 0; i < numOwners; i++) {
            this.evOwners[i] = new owner(season);
        }

        this.calculateChargeTime();

        this.totPower = 0;
        for(var j = 0; j < 23; j++) {
            this.totPower += this.hoursTotals[j];
        }
        
        var size = this.evOwners.length;
        for(var k = 0; k <= 9; k++) {
            for(var l = 0; l < size; l++) {
                var st = this.evOwners[l].getVehType();
                if(st == this.carTypes[k]) {
                    this.carNumbers[k] = this.carNumbers[k] + this.evOwners[l].getCarNum();
                }
            }
        }
    }

    getCars() {
        var result = "";
        if(this.numPop == 1) {
            for(var k = 0; k <= 9; k++) {
                if(this.carNumbers[k] != 0) {
                    result += this.carTypes[k] + '<br>';
                }
            }
            result += 'Drove ' + parseInt(this.evOwners[0].getDailyMiles()) + " miles per day<br>Plugged in at hour " + parseInt(this.evOwners[0].getPlugTime()) + "<br>Drove with a " + parseFloat(this.evOwners[0].getEff()).toFixed(2) + " efficiency Multiplier<br>";
        } else {
            for(var k = 0; k <= 9; k++) {
                if(this.carNumbers[k] != 0) {
                    result += this.carTypes[k] + ": " + this.carNumbers[k] + '<br>';
                }
            }
        }
        return result;
    }

    calculateChargeTime() {
        var evArraySize = this.evOwners.length;
        for(var i = 0; i <= 23; i++) {
            var kWh = 0;
            for(var j = 0; j < evArraySize; j++) {
                kWh += this.evOwners[j].getChargeHour(i);
            }
            this.hoursTotals[i] = kWh;
        }
    }

    graphArray() {
        return [['Hour', 'Average Home Power','Home with EV Power'],
                ['0',  this.housePower[0] , (this.housePower[0]  + this.hoursTotals[0] )],
                ['1',  this.housePower[1] , (this.housePower[1]  + this.hoursTotals[1] )],
                ['2',  this.housePower[2] , (this.housePower[2]  + this.hoursTotals[2] )],
                ['3',  this.housePower[3] , (this.housePower[3]  + this.hoursTotals[3] )],
                ['4',  this.housePower[4] , (this.housePower[4]  + this.hoursTotals[4] )],
                ['5',  this.housePower[5] , (this.housePower[5]  + this.hoursTotals[5] )],
                ['6',  this.housePower[6] , (this.housePower[6]  + this.hoursTotals[6] )],
                ['7',  this.housePower[7] , (this.housePower[7]  + this.hoursTotals[7] )],
                ['8',  this.housePower[8] , (this.housePower[8]  + this.hoursTotals[8] )],
                ['9',  this.housePower[9] , (this.housePower[9]  + this.hoursTotals[9] )],
                ['10', this.housePower[10], (this.housePower[10] + this.hoursTotals[10])],
                ['11', this.housePower[11], (this.housePower[11] + this.hoursTotals[11])],
                ['12', this.housePower[12], (this.housePower[12] + this.hoursTotals[12])],
                ['13', this.housePower[13], (this.housePower[13] + this.hoursTotals[13])],
                ['14', this.housePower[14], (this.housePower[14] + this.hoursTotals[14])],
                ['15', this.housePower[15], (this.housePower[15] + this.hoursTotals[15])],
                ['16', this.housePower[16], (this.housePower[16] + this.hoursTotals[16])],
                ['17', this.housePower[17], (this.housePower[17] + this.hoursTotals[17])],
                ['18', this.housePower[18], (this.housePower[18] + this.hoursTotals[18])],
                ['19', this.housePower[19], (this.housePower[19] + this.hoursTotals[19])],
                ['20', this.housePower[20], (this.housePower[20] + this.hoursTotals[20])],
                ['21', this.housePower[21], (this.housePower[21] + this.hoursTotals[21])],
                ['22', this.housePower[22], (this.housePower[22] + this.hoursTotals[22])],
                ['23', this.housePower[23], (this.housePower[23] + this.hoursTotals[23])]];
    }
}