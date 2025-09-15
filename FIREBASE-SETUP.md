# 🔥 Firebase Setup Instructions for HomeBase

## Step 1: Create Firebase Project

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Click "Add project"**
3. **Project name**: `HomeBase-App` (or your preferred name)
4. **Continue through setup** (Google Analytics optional)

## Step 2: Enable Authentication

1. **In Firebase Console**, click **Authentication** from left sidebar
2. **Click "Get started"**
3. **Go to "Sign-in method" tab**
4. **Enable "Email/Password"** method
5. **Click "Save"**

## Step 3: Enable Firestore Database

1. **Click "Firestore Database"** from left sidebar
2. **Click "Create database"**
3. **Choose "Start in test mode"** (for now)
4. **Select location** (choose closest to your users)

## Step 4: Get Your Firebase Config

1. **Click the gear icon** ⚙️ next to "Project Overview"
2. **Click "Project settings"**
3. **Scroll down to "Your apps"**
4. **Click the web icon** `</>`
5. **App nickname**: `HomeBase-Web`
6. **Copy the config object** that looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "homebase-app-12345.firebaseapp.com",
  projectId: "homebase-app-12345",
  storageBucket: "homebase-app-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Step 5: Update Your Code

1. **Open `firebase-config.js`** in your HomeBase folder
2. **Replace the placeholder config** with your actual config:

```javascript
// Replace this entire object with your Firebase config
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project.firebaseapp.com", 
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

## Step 6: Set Firestore Security Rules

1. **In Firebase Console**, go to **Firestore Database**
2. **Click "Rules" tab**
3. **Replace the rules** with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. **Click "Publish"**

## Step 7: Test Your Setup

1. **Push your changes** to GitHub:
   ```bash
   git add .
   git commit -m "Add Firebase integration"
   git push origin main
   ```

2. **Visit your live site**: https://lourensstrauss99.github.io/HomeBase/

3. **Try creating an account** and logging in

## 🎉 You're Done!

Your HomeBase now has:
- ✅ **Real user authentication**
- ✅ **Cloud database storage**
- ✅ **Multi-user support**
- ✅ **Data persistence across devices**
- ✅ **Secure access control**

## 🚨 Important Notes

- **Keep your API keys secure** (they're safe for web apps)
- **Don't share your Firebase project** with untrusted users
- **Monitor usage** in Firebase Console
- **Free tier limits**: 50K reads/writes per day (more than enough for personal use)

## 🔧 Troubleshooting

If you see errors:
1. **Check browser console** for specific error messages
2. **Verify Firebase config** is correctly copied
3. **Ensure Authentication and Firestore** are enabled
4. **Check Firestore security rules** match above

Your HomeBase is now enterprise-ready! 🚀