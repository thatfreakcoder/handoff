import { initializeApp } from "../firebase/firebase-app.js";
import { getDatabase, ref, set } from "../firebase/firebase-database.js";

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

// get qeury string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const contentKey = urlParams.get("content");
const fromKey = urlParams.get("from");

function writeUserData(date, content, from) {
    const db = getDatabase();
    set(ref(db, 'clipboards/' + date), {
        content: content,
        from: from
    });
}

const dateSelector = new Date();
const dateKey = dateSelector.getDate() + "-" + (dateSelector.getMonth() + 1) + "-" + dateSelector.getFullYear();
writeUserData(dateKey, contentKey, fromKey);