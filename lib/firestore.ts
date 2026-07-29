import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import type { EnergyInput, EnergyReading } from "@/lib/your-energy";

function getFirebaseApp() {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin environment variables are missing");
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export async function saveEnergyReading(
  input: EnergyInput,
  reading: EnergyReading
) {
  await getFirestore(getFirebaseApp()).collection("energyReadings").add({
    nickname: input.nickname.trim(),
    birthDate: input.birthDate,
    birthTime: input.birthTime || null,
    birthPlace: input.birthPlace || null,
    location: input.location,
    reading,
    readingDate: input.today,
    createdAt: FieldValue.serverTimestamp(),
  });
}
