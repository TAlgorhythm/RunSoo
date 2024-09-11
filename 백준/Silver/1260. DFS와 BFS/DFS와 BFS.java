import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Stack;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception, IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        int V = Integer.parseInt(st.nextToken());
        List<Integer>[] list = new ArrayList[N + 1];
        
        for (int i = 1; i <= N; i++) {
            list[i] = new ArrayList<>();
        }
        
        for (int i = 0; i < M; i++) {
            st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            list[a].add(b);
            list[b].add(a);
        }
        
        for (int i = 1; i <= N; i++) {
            Collections.sort(list[i]);
        }
        
        boolean[] visited = new boolean[N + 1];
        dfs(list, V, visited);
        System.out.println();
        
        visited = new boolean[N + 1];
        bfs(list, V, visited);
    }
    
    public static void dfs(List<Integer>[] list, int V, boolean[] visited) {
        Stack<Integer> stack = new Stack<>();
        stack.push(V);
        
        while (!stack.isEmpty()) {
            int curr = stack.pop();
            
            if (!visited[curr]) {
                visited[curr] = true;
                System.out.print(curr + " ");
                
                for (int i = list[curr].size() - 1; i >= 0; i--) {
                    int next = list[curr].get(i);
                    if (!visited[next]) {
                        stack.push(next);
                    }
                }
            }
        }
    }
    
    public static void bfs(List<Integer>[] list, int V, boolean[] visited) {
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(V);
        visited[V] = true;
        
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            System.out.print(curr + " ");
            
            for (int next : list[curr]) {
                if (!visited[next]) {
                    queue.offer(next);
                    visited[next] = true;
                }
            }
        }
    }
}