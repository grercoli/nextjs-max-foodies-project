import Link from "next/link"
import Image from "next/image"

import MainHeaderBackground from './MainHeaderBackground';
import NavLink from "./NavLink"
import logoImg from "@/public/images/logo.png"
import styles from "./MainHeader.module.css"

const MainHeader = () => {
  

  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <Image src={logoImg} alt="a plate with a food on it" priority />
          {/* <img src={logoImg.src} alt="a plate with a food on it" /> */}
          NextLevel Food
        </Link>

        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default MainHeader