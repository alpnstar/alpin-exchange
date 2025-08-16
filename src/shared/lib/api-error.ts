export interface ApiErrorResponse {
  status: number;
  message: string;
  field?: string;
  code?: string;
}

export function createErrorResponse(
  status: number,
  message: string,
  field?: string,
  code?: string
) {
  const body: ApiErrorResponse = { status, message, field, code };
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
