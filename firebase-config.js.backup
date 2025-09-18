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
const storage = firebase.storage();

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
            console.log('Attempting to save user data for userId:', userId);
            console.log('Data being saved:', data);
            
            await db.collection('users').doc(userId).set(data, { merge: true });
            console.log('User data saved successfully to Firestore');
            return { success: true };
        } catch (error) {
            console.error('Error saving user data to Firestore:', error);
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
    },
    
    // Check if username exists
    checkUsernameExists: async (username) => {
        try {
            console.log('Checking if username exists:', username);
            const doc = await db.collection('usernames').doc(username.toLowerCase()).get();
            const exists = doc.exists;
            console.log('Username exists result:', exists);
            return exists;
        } catch (error) {
            console.error('Error checking username (treating as available):', error);
            // If there's an error (e.g., collection doesn't exist), treat username as available
            return false;
        }
    },
    
    // Save username mapping
    saveUsernameMapping: async (username, userId) => {
        try {
            await db.collection('usernames').doc(username.toLowerCase()).set({
                userId: userId,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Get user ID by username
    getUserIdByUsername: async (username) => {
        try {
            const doc = await db.collection('usernames').doc(username.toLowerCase()).get();
            if (doc.exists) {
                return { success: true, userId: doc.data().userId };
            } else {
                return { success: false, error: 'Username not found' };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Get user data by username
    getUserDataByUsername: async (username) => {
        try {
            const userIdResult = await this.getUserIdByUsername(username);
            if (userIdResult.success) {
                return await this.getUserData(userIdResult.userId);
            } else {
                return userIdResult;
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Upload profile photo
    uploadProfilePhoto: async (userId, file) => {
        try {
            // Validate file
            if (!file) {
                return { success: false, error: 'No file provided' };
            }
            
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                return { success: false, error: 'File size must be less than 5MB' };
            }
            
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                return { success: false, error: 'Only JPG, PNG, GIF, and WebP files are allowed' };
            }
            
            // Create unique filename
            const filename = `profile_photos/${userId}_${Date.now()}.${file.name.split('.').pop()}`;
            const storageRef = storage.ref(filename);
            
            // Upload file
            const snapshot = await storageRef.put(file);
            const downloadURL = await snapshot.ref.getDownloadURL();
            
            return { success: true, url: downloadURL, path: filename };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Delete profile photo
    deleteProfilePhoto: async (photoPath) => {
        try {
            if (photoPath) {
                const storageRef = storage.ref(photoPath);
                await storageRef.delete();
            }
            return { success: true };
        } catch (error) {
            // Don't fail if photo doesn't exist
            console.warn('Photo deletion error:', error);
            return { success: true };
        }
    }
};