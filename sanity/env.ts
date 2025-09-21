const requiredEnvVar = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const projectId = requiredEnvVar("NEXT_PUBLIC_SANITY_PROJECT_ID");
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";
export const useCdn = process.env.NODE_ENV === "production";
export const token = process.env.SANITY_API_TOKEN;
