// this is an API from Node and allow us to work with the file system
import fs from "node:fs"

import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"

const db = sql("meals.db")

export async function getMeals() {
  // para probar el loading page
  await new Promise(resolve => setTimeout(resolve, 2000))

  return db.prepare("SELECT * FROM meals").all()
}

export function getMeal(slug) {
  // el ? es como un placeholder y toma el valor de lo que se ponga en el get().. esto hace la consulta mas segura
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug)
}

export async function saveMeal(meal) {
  // lower: true hace que todo se vuelva minuscula
  // A slug is the part of a URL that identifies a particular page on a website in an easy-to-read form
  meal.slug = slugify(meal.title, { lower: true })

  // como siguiente paso quiero remover cualquier cosa peligrosa que se encuentre en instructions. Sanitize and clean instructions
  meal.instructions = xss(meal.instructions)

  // la imagen debe ser almacenada en el file system, no en la base de datos (es mala idea)
  const extension = meal.image.name.split(".").pop()
  const timestamp = Date.now()
  const filename = `${meal.slug}_${timestamp}.${extension}`

  const stream = fs.createWriteStream(`public/images/${filename}`)
  const bufferedImage = await meal.image.arrayBuffer()

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!")
    }
  })

  meal.image = `/images/${filename}`

  db.prepare(
    `INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)`
  ).run(meal)
}