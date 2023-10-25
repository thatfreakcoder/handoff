import { initializeApp } from "./firebase/firebase-app.js";
import { getDatabase, ref, onValue, set } from "./firebase/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBgVg0b2Hxz8TmEV50a3rQAdhasy83FYRo",
    authDomain: "handoff-windows.firebaseapp.com",
    databaseURL: "https://handoff-windows-default-rtdb.firebaseio.com",
    projectId: "handoff-windows",
    storageBucket: "handoff-windows.appspot.com",
    messagingSenderId: "711287001274",
    appId: "1:711287001274:web:223941bf484c4846633283",
    measurementId: "G-8BCB908812"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const clipboard = navigator.clipboard;
const clipboardBtn = document.getElementById("copy");
const local = document.getElementById("local");
const paste = document.getElementById("paste");

// READ DATA FROM REMOTE AND PASTE TO LOCAL
document.addEventListener("DOMContentLoaded", function () {
    clipboard.readText().then((text) => {
        local.value = text;
    });
    const clipboardRef = ref(db, `/clipboards/latest`);
    onValue(clipboardRef, (snapshot) => {
        const data = snapshot.val();
        document.getElementById("main").innerHTML = data.content;
    });
})

clipboardBtn.addEventListener("click", function () {
    const content = document.getElementById("main").innerHTML;
    clipboard.writeText(content);
});

// WRITE DATA FROM LOCAL TO REMOTE
paste.addEventListener("click", async function () {
    const content = local.value;
    const dateSelector = new Date();
    const dateKey = dateSelector.getDate() + "-" + (dateSelector.getMonth() + 1) + "-" + dateSelector.getFullYear();
    const clipboardDateRef = ref(db, `/clipboards/${dateKey}`);
    await set(clipboardDateRef, {
        content: content,
        from: "desktop"
    });
    const clipboardLatestRef = ref(db, `/clipboards/latest`);
    await set(clipboardLatestRef, {
        content: content,
        from: "desktop"
    });
});