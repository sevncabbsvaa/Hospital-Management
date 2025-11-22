import React, { useState } from "react";
import styles from "./Login.module.css";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // demo: simulate async login
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    // burada real layihədə API çağırışı olacaq
    alert(`Logging in as ${form.email}`);
  };

  return (
    <div className={styles.pageWrap}>
      <div className={styles.card}>
        <div className={styles.left}>
          {/* dekorativ arxa şəkil */}
          <img
            src=""
            alt=""
            className={styles.bgImage}
            aria-hidden="true"
          />

          <div className={styles.leftOverlay} />

          <div className={styles.leftContent}>
            <h1 className={styles.title}>Welcome to Hospital</h1>
            <p className={styles.lead}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </p>

            
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.formWrap}>
            <h2 className={styles.loginTitle}>USER LOGIN</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.inputGroup}>
                <span className={styles.icon} aria-hidden="true">
                  {/* user icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className={styles.input}
                  aria-label="Email"
                />
              </label>

              <label className={styles.inputGroup}>
                <span className={styles.icon} aria-hidden="true">
                  {/* lock icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="11" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className={styles.input}
                  aria-label="Password"
                />
              </label>

              <div className={styles.row}>
                <label className={styles.remember}>
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                  />
                  <span>Remember</span>
                </label>

                <a href="#forgot" className={styles.forgot}>
                  Forgot password?
                </a>
              </div>

              <button type="submit" className={styles.loginBtn} disabled={submitting}>
                {submitting ? "Logging..." : "LOGIN"}
              </button>
            </form>
          </div>
        </div>
      </div>

      
    </div>
  );
}
