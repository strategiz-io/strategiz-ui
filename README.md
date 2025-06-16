# Strategiz UI

Clean UI implementation for the Strategiz platform, following best architectural practices with a feature-based structure and Redux state management.

## Architecture

The Strategiz UI follows a clean architecture approach with strict separation of concerns. The codebase is organized in a feature-based structure to enhance scalability and developer productivity.

### Key Architectural Patterns

#### Feature-Based Structure

The codebase is organized into feature folders, each containing its own components, screens, services, hooks, and Redux slices:

```
src/
├── assets/                # App-wide assets (logo.png, etc.)
├── components/            # Shared, reusable UI components
│   ├── Logo.tsx           # Strategiz logo component
│   └── ui/                # Common UI utilities
│       └── LoadingOverlay.tsx  # Loading overlay component
├── features/              # Feature modules
│   ├── auth/              # Authentication feature
│   │   ├── components/    # Auth-specific components 
│   │   ├── hooks/         # Custom hooks for auth
│   │   ├── redux/         # Redux slice for auth state
│   │   ├── screens/       # Navigation destinations for auth
│   │   ├── services/      # Service bridges to backend
│   │   └── types/         # TypeScript types for auth
│   └── landing/           # Landing page feature
│       └── screens/       # Landing screen component
├── store/                 # Redux store configuration
└── routes/                # Application routing
```

### Architectural Principles

1. **Screens vs Components**
   - **Screens**: Full navigation destinations (routes) like SignInScreen, LandingScreen
   - **Components**: Reusable UI pieces that compose screens

2. **Shared vs Feature-Specific Code**
   - **Shared Code**: Lives at the top-level directories (components/, assets/)
   - **Feature-Specific**: Lives inside its feature directory

3. **Redux Organization**
   - **Feature-level Redux**: Each feature has its own redux/ folder with slice and selectors
   - **App-level Store**: The top-level store/ combines all feature reducers

#### Clean Separation of Concerns

The application follows these layers for clean separation:

1. **UI Layer (Components)**: Presentational components with no business logic
2. **Controller Layer (Hooks)**: Mediates between UI and services
3. **Service Bridge Layer**: Interface to backend business logic in strategiz-core
4. **Redux State**: Global application state management

### Naming and File Conventions

1. **Component Files**
   - Use PascalCase for component file names: `Button.tsx`, `UserCard.tsx`
   - Name files the same as the component they export

2. **Feature Organization**
   - Always create new features in `src/features/` directory
   - Use kebab-case for feature directory names: `user-profile`, `data-visualization`

3. **Screen Naming**
   - Always use the "Screen" suffix for navigation destinations: `ProfileScreen.tsx`, `DashboardScreen.tsx`
   - Place screens in the feature's `screens/` directory

4. **Component Placement**
   - Place app-wide shared components in top-level `src/components/`
   - Place feature-specific components in `features/[feature]/components/`
   - Never create a "common" directory inside features

5. **Redux Organization**
   - Name slice files with the `Slice` suffix: `authSlice.ts`, `userSlice.ts`
   - Export selectors from the same file as the slice

### When to Create a New Feature

Create a new feature directory when:

1. The code represents a distinct functional area of the application
2. It has its own routes/screens
3. It manages its own specific state
4. It could potentially be developed or maintained independently

For smaller pieces of functionality that don't meet these criteria, consider creating components within an existing feature or in the shared components directory.

#### State Management with Redux

Redux is used for state management with:

- Redux Toolkit for simplified Redux usage
- Type-safe selectors and actions
- Slice-based organization aligned with features

### Implementation Status and Future Directions

#### Current Implementation

- ✅ Feature-based architecture established
- ✅ Authentication UI feature with Redux integration
- ✅ Route guards for protected and public routes
- ✅ Mock service implementations for authentication

#### Upcoming Work

- 🔲 Backend integration with strategiz-core services
- 🔲 Additional features (dashboard, user profile, etc.)
- 🔲 Unit testing for components, hooks, and Redux slices
- 🔲 End-to-end testing for critical user flows

#### Code Quality Principles

1. **UI components must be presentation-only**
   - All business logic belongs in hooks and services
   - Components receive data and callbacks as props

2. **Controller hooks are responsible for:**
   - Managing component state
   - Calling service methods
   - Dispatching Redux actions

3. **Services are bridges to business logic**
   - Define interfaces for backend functionality
   - Use mock implementations during frontend development
   - Will be replaced with real implementations during backend integration

4. **Minimize dependencies between features**
   - Features should communicate via Redux state when possible
   - Direct imports between feature directories should be minimized

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
