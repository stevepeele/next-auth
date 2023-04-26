import Link from "next/link"
import { useSession } from "@auth/nextjs/client"
import styles from "./header.module.css"

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header>
      <noscript>
        <style>{".nojs-show { opacity: 1; top: 0; }"}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && status === "loading" ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a href="/api/auth/signin" className={styles.buttonPrimary}>
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              {session.user.image && (
                <img src={session.user.image} className={styles.avatar} />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email} </strong>
                {session.user.name ? `(${session.user.name})` : null}
              </span>
              <a href="/api/auth/signout" className={styles.button}>
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/client">Client</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/server">Server</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/protected">Protected</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/api-example">API</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/middleware-protected">Middleware protected</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}