import { initializeApp } from "./firebase/firebase-app.js";
import { getDatabase, ref, onValue } from "./firebase/firebase-database.js";

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