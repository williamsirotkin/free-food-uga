import { getDatabase, ref, onValue} from "firebase/database";

function readMarkers() {
    const db = getDatabase();
    const markerData = ref(db, 'Markers/');
    onValue(markerData, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });
}