"use server"

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidInput(value) {
  //trim es para remover empty spaces
  return !value || value.trim() === ""
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  // verificacion de los inputs del lado del servidor
  if (isInvalidInput(meal.title) || isInvalidInput(meal.summary) || isInvalidInput(meal.instructions) || isInvalidInput(meal.image) || isInvalidInput(meal.creator) || isInvalidInput(meal.creator_email) || !meal.creator_email.includes("@") || !meal.image || meal.image.size === 0) {
    return {
      message: "Invalid input."
    }
  }

  await saveMeal(meal)
  // cada vez que se crea un nuevo meal, se debe revalidar la pagina de meals para que se actualize y muestre el nuevo meal. Ya que el nuevo meal no se va a mostrar hasta que se haga un refresh de la pagina, debido al caching de next. En resumen le dice a Next que revalide el cache de cierto path. Por default solo el path de "/meals" va a ser revalidado no seria el caso para los nested paths como por ejemplo "/meals/shared". Para solucionar eso se puede pasar un segundo parametro que seria "layout", el valor por defecto es "page"
  revalidatePath("/meals")
  redirect("/meals")
}
