
# User Profile Task

This project is a Vite + React + TypeScript starter for the User Profile Settings form assessment. It is structured with a focus on clean separation of components, hooks, reducers, and context.

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ryan50500/user-profile-task.git
   cd user-profile-task
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server and JSON server simultaneously**:

   ```bash
   npm run dev:all
   ```

## Project Structure

* `src/components/` – Reusable UI components, including form fields and stepper logic.
* `src/context/` – Manages global state using React Context API.
* `src/reducers/` – Reducer logic for managing local form and fetch states.
* `src/hooks/` – Custom hooks for encapsulating reusable logic, such as validation and data fetching.
* `src/styles/` – CSS modules for styling individual components.

## Notes

* This project uses React Context API for state management.
* The `dev:all` script runs both the Vite development server and the JSON server required for the application.

---

