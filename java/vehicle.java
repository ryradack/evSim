//import java.text.DecimalFormat;

public class vehicle {
	private float battSize; // Battery size in kW
	private float chargeTime; // Charge time in hours
	private String name;
	private int maxMilesEV = 0; // Maximum miles electric only
	private int maxMilesPH = 0; // Maximum miles using hybrid mode - in fully
							//   electric vehicles, this is set to the same
							//   as maxMilesEV
	//DecimalFormat df = new DecimalFormat("###.##");
	
	public vehicle() {
		double randVehicle = Math.random();
		randomVehicle(randVehicle);
	}
	
	public void randomVehicle(double d) {
		if(d<=0.228375944) { //Chevrolet Volt
			name = "Chevrolet Volt";
			chargeTime = 4;
			battSize = 14;
			maxMilesEV = 53;
			maxMilesPH = 420;
		}
		else if((d>0.228375944)&&(d<=.443174433)) { //Nissan Leaf
			name = "Nissan Leaf";
			chargeTime = 6;
			battSize = 24; // New Leaf has 30 kWh battery; discuss with team about updating
			maxMilesEV = 85; // New Leaf has 107 mile range
			maxMilesPH = maxMilesEV;
		}
		else if((d>0.443174433)&&(d<=.625779992)) { //Tesla Model S
			name = "Tesla Model S";
			chargeTime = 9;
			battSize = 85; // Now 100 kWh battery
			maxMilesEV = 285;
			maxMilesPH = maxMilesEV;
		}
		else if((d>0.625779992)&&(d<=0.717814132)) { //Toyota Prius PHV
			name = "Toyota Prius PHV";
			chargeTime = (float) 2.7;
			battSize = 9;
			maxMilesEV = 25;
			maxMilesPH = 640;
		}
		else if((d>0.717814132)&&(d<=0.802662894)) { //Ford Fusion Energi
			name = "Ford Fusion Energi";
			chargeTime = (float) 2.5;
			battSize = 7;
			maxMilesEV = 22;
			maxMilesPH = 610;
		}
		else if((d>0.802662894)&&(d<=0.869882917)) { //Ford C-Max Energi
			name = "Ford C-Max Energi";
			chargeTime = (float) 2.5;
			battSize = 8;
			maxMilesEV = 19;
			maxMilesPH = 550;
		}
		else if((d>0.869882917)&&(d<=0.919608955)) { //BMW i3
			name = "BMW i3";
			chargeTime = 4;
			battSize = 22;
			maxMilesEV = 118; // Confirm these numbers with Eliot
			maxMilesPH = 205;
		}
		else if((d>0.919608955)&&(d<=0.956733413)) { //Fiat 500e
			name = "Fiat 500e";
			chargeTime = 4;
			battSize = 24;
			maxMilesEV = 84;
			maxMilesPH = maxMilesEV;
		}
		else if((d>0.956733413)&&(d<=0.983979604)) { //Tesla Model X
			name = "Tesla Model X";
			chargeTime = 8;
			battSize = 100;
			maxMilesEV = 295;
			maxMilesPH = maxMilesEV;
		}
		else if((d>0.983979604)&&(d<=1)) { //Volkswagen e-Golf
			name = "Volkswagen e-Golf";
			chargeTime = 3;
			battSize = 24;
			maxMilesEV = 83;
			maxMilesPH = maxMilesEV;
		}
		else {
			name = "No Name";
			chargeTime = 5;
			battSize = 15;
			maxMilesEV = 50;
			maxMilesPH = 70;
		}
	}
	
	// The following just return the individual information
	// of the vehicle if/when asked to.
	
	public float getBattSize() {
		return battSize;
	}
	
	public float getChargeTime() {
		return chargeTime;
	}
	
	public String getName() {
		return name;
	}
	
	public int getMaxMilesEV() {
		return maxMilesEV;
	}
	
	public int getMaxMilesPH() {
		return maxMilesPH;
	}
}
