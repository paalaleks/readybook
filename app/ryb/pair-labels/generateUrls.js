import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/firebase/config";

export default async function generateUrls() {
  const urlObjects = [];
  const urlNames = [];
  for (let i = 0; i < 44; i++) {
    const uuid = uuidv4().replace(/-/g, "").substr(0, 8);
    const urlName = uuid
      .replace(/[^\w]/g, "")
      .split("")
      .map((c) => (Math.random() < 0.5 ? c.toLowerCase() : c.toUpperCase()))
      .join("");
    urlNames.push(urlName);
  }

  const group = urlNames[0];
  for (const url of urlNames) {
    urlObjects.push({ url, group });
  }

  const urlsCollectionRef = collection(db, "urls");
  const urlsDocRef = await addDoc(urlsCollectionRef, { urls: urlObjects });

  // Backup to urlsCopy collection using the same document ID
  const urlsCopyCollectionRef = collection(db, "urlsCopy");
  const urlsCopyDocRef = doc(urlsCopyCollectionRef, urlsDocRef.id);
  await setDoc(urlsCopyDocRef, { urls: urlObjects });
}
