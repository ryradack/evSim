public class owner {
	int carNumber;
	vehicle vehType;
	int plugTime;
	double totalBatt;
	boolean ranGas = false;
	
	public owner() {
		// This chooses the number of vehicles
		double d = Math.random();
		if(d<=.9) {carNumber = 1;}
		else{carNumber = 2;}
		carNumber = 1;
		vehType = new vehicle();
		
		// This sets the plug in time between 5 and 9 PM.
		plugTime = (int) Math.random()*2+20;
		getTotalBattery();
	}
	
	public void getTotalBattery() {
		// The first part calculates the random number of miles that the
		// owner drove that day. According to the site below, about 40 miles
		// per day is average. This then adds up to +-5 miles.
		// https://www.fhwa.dot.gov/ohim/onh00/bar8.htm
		double d = 5*Math.random(), e = Math.random();
		double dailyMiles = 41.1;
		if(e>.5) {dailyMiles += d;}
		else{dailyMiles -= d;}
		
		// The next step is to compare it to the battery life. If the miles driven are farther than the
		// electric range, set ranGas to TRUE and set battery to 0. Else, calculate what percentage of
		// the battery is left, and set the totalBatt to that.
		if(vehType.getMaxMilesEV()<dailyMiles) {
			ranGas = true;
			totalBatt = vehType.getBattSize()*carNumber;
		}
		else {
			double percentBatt = dailyMiles/vehType.getMaxMilesEV();
			totalBatt = vehType.getBattSize()*percentBatt;
		}
	}
	
	public float getChargeHour(int hour) {
		float currCharge = 0;
		float chargePerHour = carNumber*(vehType.getBattSize()/vehType.getChargeTime());
		
		//set currCharge of vehicles
		if(hour<plugTime) {
			currCharge = (24-plugTime+hour)*chargePerHour;
			
		}
		else if(hour>=plugTime) {
			currCharge = (hour - plugTime + 1)*chargePerHour;
		}
		
		if(currCharge>totalBatt) {return 0;}
		else {return chargePerHour;}
	}
	
	public String getVehType() {
		return vehType.getName();
	}
	
	public int getCarNum() {
		return carNumber;
	}
}
