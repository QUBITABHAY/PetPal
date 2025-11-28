import {
  API_BASE_URL,
  TASKS_API_URL as ENV_TASKS_API_URL,
  PROFILE_API_URL as ENV_PROFILE_API_URL,
} from "@env";

export const BASE_URL = API_BASE_URL || "http://localhost:3000/api";
export const PETS_API_URL = `${BASE_URL}/pets`;
export const TASKS_API_URL = ENV_TASKS_API_URL || `${BASE_URL}/tasks/upcoming`;
export const PROFILE_API_URL =
  ENV_PROFILE_API_URL || `${BASE_URL}/auth/profile`;
