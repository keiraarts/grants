let environment = "prod";
if (process && process.env && process.env.NODE_ENV === "development")
  environment = "dev";

export function apiUrl() {
  if (environment === "dev") return "http://localhost:3000/api";
  else if (environment === "prod") return "https://269b2a7bc089.ngrok.io/api";
}
