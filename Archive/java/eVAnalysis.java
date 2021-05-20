/*
 * This project was originally created by Nolan Jessen on
 * December 2nd, 2016.
 */
import java.util.*;

public class eVAnalysis {
	//Defines list of owners, hours, and total kWh being used per hour
	List<owner> evOwners = new ArrayList<owner>();
	int[] hours = {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23};
	float[] hourTotals = new float[24];
	int[] carNumbers = new int[10];
	String[] carTypes = {"Chevrolet Volt", "Nissan Leaf",
			"Tesla Model S", "Toyota Prius PHV", "Ford Fusion Energi",
			"Ford C-Max Energi", "BMW i3", "Fiat 500e", "Tesla Model X", "Volkswagen e-Golf"};
	
	public static void main(String[] args){
		new eVAnalysis(0);
	}
	
	public eVAnalysis(int numOwners) {
		//Randomly generates users
		Scanner s = new Scanner(System.in);
		
		if(numOwners==0) {
			System.out.println("Please input a number of users:");
			numOwners = s.nextInt();
		}
		
		for(int i=0;i<numOwners;i++) {
			evOwners.add(new owner());
		}
		
		//Calculates power per hour
		calculateChargeTime();
		for(int j=0;j<=23;j++) {
			System.out.println("Hour: " + hours[j] + " Amount of Power (kWh): " + hourTotals[j]);
		}
		
		// Calculates the total power
		float totPower = 0;
		for(int j=0;j<=23;j++) {
			totPower += hourTotals[j];
		}
		System.out.println("Total power used: " + totPower + " kWh");
		
		// Calculates number of each vehicle
		int size = evOwners.size();
		for(int k = 0;k<=9;k++) {
			for(int l = 0; l<size; l++) {// This loop goes through each owner
				String st = evOwners.get(l).getVehType();
				if(st.compareTo(carTypes[k])==0) {
					carNumbers[k] = carNumbers[k] + evOwners.get(l).getCarNum();
				}
			}
			System.out.println(carTypes[k] + ": " + carNumbers[k]);
		}
		
		
	}
	
	public void calculateChargeTime() {
		for(int i=0;i<=23;i++) {
			float kWh = 0;
			for(int j=0;j<evOwners.size();j++) {
				float currTotal = evOwners.get(j).getChargeHour(i);
				kWh = kWh + currTotal;
			}
			hourTotals[i] = kWh;
		}
	}
	
	public int[] getCarNums() {
		return carNumbers;
	}
	
	public float[] getHours() {
		return hourTotals;
	}
	
	// This loop returns true if it ever ran out of gas
	public boolean noElec() {
		for(int i=0;i<evOwners.size();i++) {
			if(evOwners.get(i).ranGas) {
				return true;
			}
		}
		return false;
	}
}
