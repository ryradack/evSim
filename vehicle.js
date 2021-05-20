class vehicle {
	getBattSize() {
		return this.battSize;
	}
	getChargeTime() {
		return this.chargeTime;
	}
	getName() {
		return this.name;
	}
	getMaxMilesEV() {
		return this.maxMilesEV;
	}
	getMaxMilesPH() {
		return this.maxMilesPH;
	}
	
	randomVehicle(vehicleNum) {
		if(vehicleNum <= 0.228375944) { //Chevrolet Volt
			this.name = "Chevrolet Volt";
			this.chargeTime = 4;
			this.battSize = 14;
			this.maxMilesEV = 53;
			this.maxMilesPH = 420;
		}
		else if((vehicleNum>0.228375944) && (vehicleNum<=.443174433)) { //Nissan Leaf
			this.name = "Nissan Leaf";
			this.chargeTime = 6;
			this.battSize = 24; // New Leaf has 30 kWh battery; discuss with team about updating
			this.maxMilesEV = 85; // New Leaf has 107 mile range
			this.maxMilesPH = this.maxMilesEV;
		}
		else if((vehicleNum>0.443174433)&&(vehicleNum<=.625779992)) { //Tesla Model S
			this.name = "Tesla Model S";
			this.chargeTime = 9;
			this.battSize = 85; // Now 100 kWh battery
			this.maxMilesEV = 285;
			this.maxMilesPH = this.maxMilesEV;
		}
		else if((vehicleNum>0.625779992)&&(vehicleNum<=0.717814132)) { //Toyota Prius PHV
			this.name = "Toyota Prius PHV";
			this.chargeTime = 2.7;
			this.battSize = 9;
			this.maxMilesEV = 25;
			this.maxMilesPH = 640;
		}
		else if((vehicleNum>0.717814132)&&(vehicleNum<=0.802662894)) { //Ford Fusion Energi
			this.name = "Ford Fusion Energi";
			this.chargeTime = 2.5;
			this.battSize = 7;
			this.maxMilesEV = 22;
			this.maxMilesPH = 610;
		}
		else if((vehicleNum>0.802662894)&&(vehicleNum<=0.869882917)) { //Ford C-Max Energi
			this.name = "Ford C-Max Energi";
			this.chargeTime = 2.5;
			this.battSize = 8;
			this.maxMilesEV = 19;
			this.maxMilesPH = 550;
		}
		else if((vehicleNum>0.869882917)&&(vehicleNum<=0.919608955)) { //BMW i3
			this.name = "BMW i3";
			this.chargeTime = 4;
			this.battSize = 22;
			this.maxMilesEV = 118;
			this.maxMilesPH = 205;
		}
		else if((vehicleNum>0.919608955)&&(vehicleNum<=0.956733413)) { //Fiat 500e
			this.name = "Fiat 500e";
			this.chargeTime = 4;
			this.battSize = 24;
			this.maxMilesEV = 84;
			this.maxMilesPH = this.maxMilesEV;
		}
		else if((vehicleNum>0.956733413)&&(vehicleNum<=0.983979604)) { //Tesla Model X
			this.name = "Tesla Model X";
			this.chargeTime = 8;
			this.battSize = 100;
			this.maxMilesEV = 295;
			this.maxMilesPH = this.maxMilesEV;
		}
		else if((vehicleNum>0.983979604)&&(vehicleNum<=1)) { //Volkswagen e-Golf
			this.name = "Volkswagen e-Golf";
			this.chargeTime = 3;
			this.battSize = 24;
			this.maxMilesEV = 83;
			this.maxMilesPH = this.maxMilesEV;
		}
		else {
			this.name = "No Name";
			this.chargeTime = 5;
			this.battSize = 15;
			this.maxMilesEV = 50;
			this.maxMilesPH = 70;
		}
	}
	
	generateNewVehicle() {
		this.randomVehicle(Math.random());
	}
	
    constructor() {
		this.randomVehicle(Math.random());
	}
}