Auth Flow - getting data to show on the app
---

The app uses firebase for authentication. 

When a user first comes to the sitye they will need to create an account with a email address, name and password.  Only email and password is required. The username is used to display a welcome message to the usere in the header. 

This will populate the apps user data:
- In App.tsx
- isAuthuser is the the user variable stored in the state. This is a firebase user. 
- If there is no user then the app redirects to the login screen.  This is the same for when a user is logged out the app sets the username/displayName and email to an emplty string and the user to null.  So when the augh check happens after this no user will be found. 
- If the user is logged in and then refreshes, the app will check if the user is logged in already using local storage / indexedDB and onAuthStateChanged it can run the same check for the user. 