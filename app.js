import { initializeApp } from "./firebase/firebase-app.js";
import { getDatabase, ref, onValue } from "./firebase/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDoK-wLM8cEkO4ro2UznQCayZgbIZb9UnU",
    authDomain: "dropmarket-in.firebaseapp.com",
    databaseURL: "https://dropmarket-in-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dropmarket-in",
    storageBucket: "dropmarket-in.appspot.com",
    messagingSenderId: "39219558197",
    appId: "1:39219558197:web:b6e0f8d1900b353a7afe7c",
    measurementId: "G-DSBKX39965"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const clipboard = navigator.clipboard;
const clipboardBtn = document.getElementById("copy");

document.addEventListener("DOMContentLoaded", function () {
    const dateSelector = new Date();
    const dateKey = dateSelector.getDate() + "-" + (dateSelector.getMonth() + 1) + "-" + dateSelector.getFullYear();
    const starCountRef = ref(db, `/clipboards/${dateKey}`);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        document.getElementById("main").innerHTML = data.content;
    });
})

clipboardBtn.addEventListener("click", function () {
    const content = document.getElementById("main").innerHTML;
    clipboard.writeText(content);
});