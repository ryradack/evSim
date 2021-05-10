import java.util.*;

public class largeRandom {
	int[] hours = {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23};
	  int[] carNumbers = new int[10];
	  String[] carTypes = {"Chevrolet Volt", "Nissan Leaf",
			"Tesla Model S", "Toyota Prius PHV", "Ford Fusion Energi",
			"Ford C-Max Energi", "BMW i3", "Fiat 500e", "Tesla Model X", "Volkswagen e-Golf"};
	  List<eVAnalysis> analysis = new ArrayList<eVAnalysis>();
	
	public static void main(String args[]) {
		new largeRandom();
	}
	
	public largeRandom() {
		Scanner s = new Scanner(System.in);

		System.out.println("This is used to calculate a large number of random trials.");
		System.out.print("Enter the number of trials to run: ");
		int trials = s.nextInt();
		System.out.print("Enter the number of people per run: ");
		int people = s.nextInt();
		
		// This generates all of the random trials.
		for(int i=0;i<trials;i++) {
			analysis.add(new eVAnalysis(people));
		}
		
		System.out.println("-------------------------------------------------");
		System.out.println("\n\n\nHere is a summary for the simulation with "
				+ trials + " trials and " + people + " owners per trial:\n\n\n");
		
		avgHours(people);
		avgCars(people);
		timesNoElec(people);
	}
	
	// This function finds the total of the number of trials in each hour.
	// It also finds the average power use per hour.
	public   void avgHours(int people) {
		System.out.println("Here are the average hour usages:");
		for(int i = 0; i<24; i++) {
			float hourTotal = 0;
			for(int j=0; j<analysis.size(); j++) {
				hourTotal = hourTotal + analysis.get(j).getHours()[i];
			}
			System.out.println("Hour " + i + ": " + hourTotal/people + " kWh");
		}
		System.out.println();
	}
	
	// This class finds the average number of cars per eVAnalysis.
	public   void avgCars(int people) {
		System.out.println("\n\nHere were the average number of vehicles in each trial:\n");
		for(int i=0;i<10;i++) {
			int carTotal = 0;
			for(int j=0;j<analysis.size();j++) {
				carTotal = carTotal + analysis.get(j).getCarNums()[i];
			}
			int carAvg = (int)carTotal/people;
			System.out.println(carTypes[i] + ": " + carAvg);
		}
	}
	
	public int timesNoElec(int people) {
		int timesNoElec = 0;
		for(int i=0;i<analysis.size();i++) {
			if(analysis.get(i).noElec()) {
				timesNoElec++;
			}
		}
		System.out.println("At least one vehicle had a completely empty battery in "
				+ timesNoElec + " trials.");
		return timesNoElec;
	}
} 
