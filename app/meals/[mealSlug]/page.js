import Image from 'next/image'
import { notFound } from 'next/navigation'

import { getMeal } from '@/lib/meals'
import styles from './page.module.css'

const MealDetailsPage = ({ params }) => {
  const meal = getMeal(params.mealSlug)

  if (!meal) {
    // si no existe la comida, la funcion de nextJS te muestra la pagina not-found.js mas cercana
    notFound()
  }

  // replace(/\n/g, '<br />') es para reemplazar los saltos de linea por <br /> para que se vean en el html
  // es una expresion regular donde \n es el salto de linea y g es para que lo haga globalmente (en todo el string)
  meal.instructions = meal.instructions.replace(/\n/g, '<br />')

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p 
          className={styles.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  )
}

export default MealDetailsPage