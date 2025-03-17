import axios from "axios";

const TEST_ENDPOINTS = [
  "https://www.google.com",
  "https://api.github.com",
  "https://www.reddit.com/",
  "https://reqres.in/api/users/2",
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://api.cloudflare.com",
  "https://1.1.1.1",
  "https://api.publicapis.org/entries",
  "https://httpbin.org/get",
];

export interface ConnectivityResult {
  success: boolean;
  endpoint: string;
  latency: number;
  error?: string;
}

export async function testConnectivity(): Promise<ConnectivityResult[]> {
  const results: ConnectivityResult[] = [];

  for (const endpoint of TEST_ENDPOINTS) {
    const start = performance.now();
    try {
      await axios.head(endpoint, {
        timeout: 5000,
        validateStatus: () => true,
      });

      results.push({
        success: true,
        endpoint,
        latency: Math.round(performance.now() - start),
      });
    } catch (error) {
      console.error(error);
      results.push({
        success: false,
        endpoint,
        latency: Math.round(performance.now() - start),
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return results;
}
