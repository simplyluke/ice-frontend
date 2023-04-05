import { createSignal } from 'solid-js';

export default function AnimatedForm() {
    const [formState, setFormState] = createSignal('idle');
    const [name, setName] = createSignal('');
    const [email, setEmail] = createSignal('');
    const [shakeButton, setShakeButton] = createSignal(false);
  
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      setFormState('submitting');
  
      // Simulate an API call to submit the form with a 50% chance of failure
      const success = Math.random() > 0.5;
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      if (success) {
        setFormState('success');
        const timer = setTimeout(() => {
          setFormState('idle');
          setName('');
          setEmail('');
        }, 1000);
        onCleanup(() => {
          clearTimeout(timer);
        });
      } else {
        setFormState('failed');
        setShakeButton(true);
        setTimeout(() => setShakeButton(false), 500);
      }
    };
  
    return (
      <>
        <style>{`
          form {
            display: grid;
            gap: 10px;
            max-width: 300px;
            margin: 0 auto;
            opacity: 1;
            transition: opacity 300ms ease-in-out;
          }
          input[type='text'],
          input[type='email'],
          button {
            padding: 8px;
          }
          .shake {
            animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          }
          @keyframes shake {
            10%, 90% {
              transform: translate3d(-1px, 0, 0);
            }
            20%, 80% {
              transform: translate3d(2px, 0, 0);
            }
            30%, 50%, 70% {
              transform: translate3d(-4px, 0, 0);
            }
            40%, 60% {
              transform: translate3d(4px, 0, 0);
            }
          }
        `}</style>
        {formState() !== 'success' ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name()}
              onInput={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <button
              type="submit"
              classList={{ shake: shakeButton() }}
              onAnimationEnd={() => setShakeButton(false)}
              disabled={formState() === 'submitting'}
            >
              {formState() === 'submitting' ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        ) : (
          <div class="success-message">Form submitted successfully!</div>
        )}
      </>
    );
  }
  