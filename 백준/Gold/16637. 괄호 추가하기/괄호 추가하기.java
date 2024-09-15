import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
	static List<Integer> num = new ArrayList<>();
	static List<Character> op = new ArrayList<>();
	static int maxSum = Integer.MIN_VALUE;
	public static void main(String[] args) throws Exception, IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int N = Integer.parseInt(br.readLine());
		String str = br.readLine();
		for (int i=0; i<N; i++) {
			if (str.charAt(i)=='+'||str.charAt(i)=='-'||str.charAt(i)=='*') {
				op.add(str.charAt(i));
			} else num.add(str.charAt(i)-'0');
		}
		
		dfs(0, num.get(0));
		System.out.println(maxSum);
	}
	
	public static void dfs(int idx, int sum) {
		if (idx>=op.size()) {
			maxSum = Math.max(maxSum, sum);
			return;
		}
		// 괄호 안쳐
		int nSum = cal(sum, num.get(idx+1), op.get(idx));
		dfs(idx+1, nSum);
		
		// 괄호 쳐
		if (idx+1<op.size()) {
			int mSum = cal(num.get(idx+1), num.get(idx+2), op.get(idx+1));
			nSum = cal(sum, mSum, op.get(idx));
			dfs(idx+2, nSum);
		}
	}
	
	public static int cal(int i1, int i2, char o) {
		if (o=='+') return i1+i2;
		else if (o=='-') return i1-i2;
		else if (o=='*') return i1*i2;
		else return 1;
	}
}