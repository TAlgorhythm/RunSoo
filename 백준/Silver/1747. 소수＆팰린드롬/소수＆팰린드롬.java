import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
	public static void main(String[] args) throws Exception, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int N = Integer.parseInt(br.readLine());
		int result = N;
		boolean[] isPrime = new boolean[2000001];
		sieve(isPrime);
		
		while (true) {
			if (isPelindrome(result) && isPrime[result]) break;
			result++;
		}
		
		System.out.println(result);
	}
	
	public static void sieve(boolean[] isPrime) {
		for (int i=2; i<isPrime.length; i++) {
			isPrime[i]= true;
		}
		for (int i=2; i*i<isPrime.length; i++) {
			if (isPrime[i]) {
				for (int j=i*i; j<isPrime.length; j+=i) {
					isPrime[j]=false;
				}
			}
		}
	}
	
	public static boolean isPelindrome(int n) {
		String nStr = ""+n;
		for (int i=0; i<(nStr.length()/2); i++) {
			if (nStr.charAt(i)!= nStr.charAt(nStr.length()-1-i)) return false;
		}
		return true;
	}
}