import { auth, db } from "../../config/firebase.ts"
import { getDocs, collection } from "firebase/firestore"

export default async function getReportedItems() {
    if (!auth.currentUser) {
        alert("You must be logged in to view reported items.");
        return [];
    }

    const reportRef = collection(db, "reports");
    const reportSnapshot = await getDocs(reportRef);
    const reportedItems = reportSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return reportedItems;
}