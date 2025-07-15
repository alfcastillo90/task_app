# TaskApp

Aplicación de gestión de tareas con **Angular 20** en el frontend y **Firebase Functions + Firestore** en el backend, siguiendo arquitectura hexagonal y buenas prácticas.

---

## 📋 Contenidos

- [Requisitos](#-requisitos)  
- [Variables de entorno](#-variables-de-entorno)  
- [Instalación y arranque](#-instalación-y-arranque)  
  - Backend  
  - Frontend  
- [Logout y Refresh de token](#-logout-y-refresh-de-token)  
- [Listado de endpoints](#-listado-de-endpoints)  
- [Tests](#-tests)  
- [Despliegue](#-despliegue)  
- [Notas](#-notas)  

---

## 🔧 Requisitos

- **Node.js** ≥ 18  
- **npm** ≥ 9  
- **Angular CLI** ≥ 16  
- **Firebase CLI**  

---

## 🔑 Variables de entorno

### Backend (`functions/.env`)

```ini
# Ruta al JSON de service account de Firebase Admin
JSON_SECRET=/home/ccastillo/firebase/task-app-chile-001-firebase-adminsdk-XXX.json

# Secretos para firmar JWT
ACCESS_TOKEN_SECRET=una_clave_secreta_jwt
REFRESH_TOKEN_SECRET=otra_clave_secreta
