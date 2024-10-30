// src/config.js

// Determinamos la URL base según el modo de entorno definido en .env
const BASE_URL =
  import.meta.env.VITE_MODE === "production"
    ? import.meta.env.PRODUCCION_URL
    : import.meta.env.DEMO_URL;

export const API_URLS = {
  // Usuarios
  USER_ALL: `${BASE_URL}/users`,
  USER_SEARCH: `${BASE_URL}/users/search`,
  USER_DELETE: `${BASE_URL}/users/delete`,
  USER_SEARCH_ID: `${BASE_URL}/users/search`,
  USER_SEARCH_UPDATE: `${BASE_URL}/users/update`,
  USER_CREATE: `${BASE_URL}/users/create`,

  // Registros de trabajo
  WORK_RECORDS_ADD_DETAILS: `${BASE_URL}/work-records/add-details`,
  WORK_RECORDS_ACTIVE: `${BASE_URL}/work-records/active`,
  WORK_RECORDS_START: `${BASE_URL}/work-records/start-worker-hours`,
  WORK_RECORDS_END: `${BASE_URL}/work-records/end-worker-hours`,
  WORK_HOURS_SEARCH_MONTHS: `${BASE_URL}/work-hours/search/months`,
  WORK_HOURS_ALL_RECORDS: `${BASE_URL}/work-hours/all-record`,
  WORK_CLOSE_RECORDS: `${BASE_URL}/work-records/close-records`,

  // Productos
  PRODUCTS_UPDATE: `${BASE_URL}/products/update`,
  PRODUCTS_UPDATE_COUNT: `${BASE_URL}/products/update/count`,
  PRODUCTS_SEARCH: `${BASE_URL}/products/search`,
  PRODUCTS: `${BASE_URL}/products`,
  PRODUCTS_DELETE: `${BASE_URL}/products/delete`,
  PRODUCTS_CREATE: `${BASE_URL}/products/create`,

  // Logs globales
  GLOBAL_LOGS_ALL: `${BASE_URL}/global-logs`,
  GLOBAL_LOGS_MONTHS: `${BASE_URL}/globalLogs/search/months`,

  // Backup
  BACKUP: `${BASE_URL}/globalLogs/backup`,

  // Login
  LOGIN: `${BASE_URL}/admin/login`,

  // Ping
  PING: `${BASE_URL}/ping`,
};
