import MealItem from "./MealItem"
import styles from "./MealsGrid.module.css"

const MealsGrid = ({ meals }) => (
  <ul className={styles.meals}>
    {meals.map(meal => (
      <li key={meal.id}>
        <MealItem {...meal} />
      </li>
    ))}
  </ul>
)

export default MealsGrid