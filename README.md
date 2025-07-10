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

## Features

- Modularized components, hooks, and reducers for clarity and maintainability.
- Simulated error handling with a 20% failure rate during form submission.
- Conditional rendering of success and error messages.
- "Cancel" button functionality to reset dirty forms to original server data.
- "Back" button on error to reset fetch and form states.

## Usage

1. **Interacting with the Form**:
   - Fill out the form fields and navigate between steps using the stepper.
   - Submit the form to save changes. Note that there is a 40% chance of simulated failure.
   - If the form is dirty, the "Cancel" button will reset the fields to the original data from json-server.

2. **Error Handling**:
   - If an error occurs during submission, an error message will be displayed.
   - Use the "Back" button to reset the form and fetch states.


### Design Choices

- **React Context and Reducers**: I chose to use React Context API combined with reducers to manage global and local state. My goal was to declutter the main `UserProfileForm.tsx` file by moving logic into separate files and hooks. While I am more comfortable working with Redux due to my current job experience, I decided to use Context API after learning that it is commonly used on the frontend at Choreograph.
- **Custom Hooks**: To declutter the code and promote reusability, I encapsulated logic like data fetching (`useFetchUserProfile`) and form helpers (`useFormHelpers`) into custom hooks. This design also makes the code easier to read.

### Challenges Faced

- **Form State Management**: I am quite rusty with Context API, but I attempted to use it to align with Choreograph's frontend practices. However, I believe Redux would be better suited for this application due to its ability to centralize state management across the entire app. Redux Toolkit, for example, provides useful features like slices and selectors, which simplify state updates. Redux DevTools also makes debugging and tracking state changes much easier, especially in complex applications with multiple components relying on shared state.

### Observations

- For this form application, the re-render times are well within acceptable limits, ranging from 0.2ms to 0.6ms per component. Additionally, there are no expensive calculations or complex DOM updates, making the use of a provider to wrap the application a non-issue.
- Since we are not making real API calls on form save, debounce or throttling is not needed at this stage.


### Assumptions

- The form is expected to handle basic user profile fields and simulate server interactions.
- The "Cancel" button resets the form to the original server data, assuming the data is fetched successfully on load.
- The "Back" button on error resets both fetch and form states to allow retrying the operation.

---

#### Handling Asynchronous Fetch Cleanup

To ensure that no state updates happen on unmounted components, the `useFetchUserProfile` hook implements `AbortController`. This avoids potential memory leaks when the component unmounts during fetch.

