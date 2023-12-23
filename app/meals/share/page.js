"use client"

import { useFormState } from "react-dom"
import ImagePicker from '@/app/components/meals/ImagePicker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/app/components/meals/MealsFormSubmit';

export default function ShareMealPage() {
  // useFormState es un hook que nos permite acceder al estado del formulario
  // necesita dos parametros, el primero es el action y el segundo es el estado inicial del component (ShareMealPage), es decir el valor inicial que debe ser retornado por useFormState antes de que se triggeree el action y recibamos un response
  const [ currentState, formAction ] = useFormState(shareMeal, { message: null })

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {currentState.message && (
            <p className={classes.error}>{currentState.message}</p>
          )}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
