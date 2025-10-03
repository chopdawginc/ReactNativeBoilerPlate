# 📘 React Native Boilerplate

This is a **feature-based, scalable React Native boilerplate** that follows best practices for **clean architecture, modularity, and maintainability**.

---

## Development Environment

- Android Studio Ladybug | 2024.2.1 Patch 3
- Xcode 16.3
- OpenJDK 17.0.14 (LTS)
- Node v22.4.1

## Firebase Configuration

This project uses Firebase services.  
You **must replace** the current Firebase configuration files with your own project-specific files:

- **Android**: Replace `android/app/google-services.json` with the `google-services.json` file from your Firebase project.
- **iOS**: Replace `ios/GoogleService-Info.plist` with the `GoogleService-Info.plist` file from your Firebase project.

⚠️ Without these files, Firebase features such as authentication, notifications, or analytics will not work.

## 🚀 Project Structure

```
/src
  ├── assets/             # Images, fonts, icons
  ├── collections/        # Data collections (if applicable)
  ├── constant/           # Global constants (e.g., API endpoints, colors)
  ├── contexts/           # Global context providers (if needed)
  ├── features/           # Feature-based modules
  │   ├── profile/        # Example feature (Profile)
  │   │   ├── components/  # UI-only components
  │   │   ├── containers/  # Handles logic (fetching, state management)
  │   │   ├── hooks/       # Feature-specific hooks
  │   │   ├── services/    # Feature-specific API services
  │   │   ├── ProfileScreen.tsx  # Profile Screen
  │   │   ├── ProfileScreen.styles.ts  # Styles for Profile Screen
  │   │   ├── EditProfileScreen.tsx  # Edit Profile Screen
  │   │   ├── EditProfileScreen.styles.ts  # Styles for Edit Profile Screen
  │   │   ├── index.ts  # Exports feature modules
  ├── languages/          # Localization files
  ├── navigation/         # Navigation setup
  │   ├── navigation.ts   # Main navigation configurations
  │   ├── RootNavigation.tsx  # Handles global navigation
  ├── services/           # Global API services (Auth, Firebase, Base API)
  │   ├── authService.ts  # Handles authentication
  │   ├── baseService.ts  # Base API service
  │   ├── firebaseService.ts  # Firebase configurations
  │   ├── userService.ts  # User-related API calls
  ├── shared/             # Reusable UI components and hooks
  │   ├── components/     # Common UI components used across the app
  │   ├── hooks/          # Shared hooks for state management and utilities
  │   ├── utils/          # Utility functions
  ├── styles/             # Global styles (theme, fonts, etc.)
  ├── types/              # TypeScript types/interfaces
```

---

## 📦 Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/chopdawginc/ReactNativeBoilerPlate.git
cd react-native-boilerplate
```

### 2️⃣ Install Dependencies

```bash
yarn install  # or npm install
```

### 3️⃣ Run the App

```bash
yarn android  # For Android
yarn ios      # For iOS
```

_(Make sure you have React Native CLI, Xcode (for iOS), and Android SDK set up.)_

---

## 🔗 Conventions & Best Practices

- ✅ **Component Naming:** `PascalCase` (e.g., `ProfileHeader.tsx`)
- ✅ **File Naming:** `ComponentName.styles.ts` for styles, `ServiceName.ts` for services
- ✅ **Imports:** Use aliases (`@features`, `@services`) to avoid relative paths
- ✅ **Separation of Concerns:** Containers for logic, UI components for display
- ✅ **State Management:** Use React Context, Redux, or Zustand as needed

---

## 📚 Common Commands

```bash
yarn start      # Start Metro Bundler
yarn android    # Run on Android
yarn ios        # Run on iOS
yarn lint       # Linting
yarn test       # Run tests
yarn build      # Build the app
```

---

## 🎯 Next Steps

- 🔹 Implement authentication logic using `authService.ts`
- 🔹 Set up Redux/Context or Zustand for global state management (if needed)
- 🔹 Integrate API calls in different features
- 🔹 Add localization (`/languages` folder)

---

## 🙌 Contributing

1️⃣ **Fork the repo & clone locally**
2️⃣ **Create a new branch** (`feature/my-feature`)
3️⃣ **Commit changes** (`git commit -m "Added new feature"`)
4️⃣ **Push to GitHub & open a Pull Request**

---

## 🛠 Need Help?

If you face any issues, feel free to open an issue or contact the maintainers.

---

🚀 **Happy Coding!**

Android Studio Ladybug | 2024.2.1 Patch 3
Xcode 16.3
openjdk version "17.0.14" 2025-01-21 LTS
Node v22.4.1
