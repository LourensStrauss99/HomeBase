// Firebase Configuration - Your actual config
const firebaseConfig = {
    apiKey: "AIzaSyAAoILxea8DFWJB5tkbexezXdn8CPjNKaI",
    authDomain: "homebase-c1ae1.firebaseapp.com",
    databaseURL: "https://homebase-c1ae1-default-rtdb.firebaseio.com",
    projectId: "homebase-c1ae1",
    storageBucket: "homebase-c1ae1.firebasestorage.app",
    messagingSenderId: "971063225644",
    appId: "1:971063225644:web:b1bac0dd4dae537b641089",
    measurementId: "G-9TQKFPLKEY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Firebase utility functions
window.FirebaseUtils = {
    // Authentication state listener
    onAuthStateChanged: (callback) => {
        return auth.onAuthStateChanged(callback);
    },
    
    // Get current user
    getCurrentUser: () => {
        return auth.currentUser;
    },
    
    // Sign up with email/password
    signUp: async (email, password) => {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Sign in with email/password
    signIn: async (email, password) => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Sign out
    signOut: async () => {
        try {
            await auth.signOut();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Save user data to Firestore
    saveUserData: async (userId, data) => {
        try {
            await db.collection('users').doc(userId).set(data, { merge: true });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Get user data from Firestore
    getUserData: async (userId) => {
        try {
            const doc = await db.collection('users').doc(userId).get();
            if (doc.exists) {
                return { success: true, data: doc.data() };
            } else {
                return { success: false, error: 'No user data found' };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Save links to Firestore
    saveLinks: async (userId, links) => {
        try {
            await db.collection('users').doc(userId).update({
                links: links,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Get links from Firestore
    getLinks: async (userId) => {
        try {
            const doc = await db.collection('users').doc(userId).get();
            if (doc.exists) {
                const data = doc.data();
                return { success: true, links: data.links || [] };
            } else {
                return { success: false, error: 'No links found' };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Update analytics
    updateAnalytics: async (userId, analytics) => {
        try {
            await db.collection('users').doc(userId).update({
                analytics: analytics,
                lastAnalyticsUpdate: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};