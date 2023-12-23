"use client"

import { useRef, useState } from "react"
import Image from "next/image"

import styles from "./ImagePicker.module.css"

const ImagePicker = ({ label, name }) => {
  const [ pickedImage, setPickedImage ] = useState(null)
  const imageInput = useRef()

  const handlePickImage = () => {
    imageInput.current.click()
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (!file) {
      setPickedImage(null)
      return
    }

    const fileReader = new FileReader()
    
    // la siguiente funcion va a ser ejecutada por el fileReader una vez que ejecute y termine fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      // podemos acceder al resultado de fileReader.readAsDataURL(file) por result
      setPickedImage(fileReader.result)
    }

    fileReader.readAsDataURL(file)

    setPickedImage(file)
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>Please pick an image.</p>}
          {pickedImage && <Image src={pickedImage} alt="The image selected by the user" fill />}
        </div>
        <input type="file" id={name} accept="image/png, image/jpeg" name={name} className={styles.input} ref={imageInput} onChange={handleImageChange} required />
        <button type="button" className={styles.button} onClick={handlePickImage}>Pick Image</button>
      </div>
    </div>
  )
}

export default ImagePicker