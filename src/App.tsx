import type { Component } from 'solid-js';
import { SignInForm } from './components/SignInForm';
import { createSignal, Show } from 'solid-js';

import styles from './App.module.css';
import { clearUserCredentials, getUserCredentials } from './data/user';
import { TripPlanForm } from './components/TripPlanForm';

const App: Component = () => {
  // make this reactive to change
  const [signedIn, setSignedIn] = createSignal(getUserCredentials() != null)

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div class={styles.formContainer}>

        <Show when={signedIn()} fallback={<SignInForm onSignIn={setSignedIn(true)}/>}>
          <div>
            <h1>Always leave a plan</h1>
            <TripPlanForm />
            <div class={styles.signOutContainer}>
              <button class={styles.signOutButton} onClick={() => {
                setSignedIn(false)
                clearUserCredentials()
              }}>Sign Out</button>
            </div>
          </div>
        </Show>
        </div>
      </header>
    </div>
  );
};

export default App;
