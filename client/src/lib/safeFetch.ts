import { ApiResponse } from "@/types/api";

export async function safeFetch<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(input, init);

    let json: ApiResponse<T>;
    try {
      json = await response.json();
    } catch {
      throw new Error(`Invalid JSON response from ${input}`);
    }

    if (!response.ok || !json.success) {
      throw new Error(
        json.error || json.message || `Request failed: ${response.status}`
      );
    }

    return json.data as T;
  } catch (error) {
    throw error;  
  }
}
