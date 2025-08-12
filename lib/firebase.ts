import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBBoP09yVWGpVHHBH5balcbghlN-q0nTfA",
  authDomain: "expense-tracker-aa878.firebaseapp.com",
  projectId: "expense-tracker-aa878",
  storageBucket: "expense-tracker-aa878.firebasestorage.app",
  messagingSenderId: "82533692267",
  appId: "1:82533692267:web:889566cd29f4210b33922e",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export function isFirebaseConfigured(): boolean {
  return !!(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId)
}

export { auth }
export default app
