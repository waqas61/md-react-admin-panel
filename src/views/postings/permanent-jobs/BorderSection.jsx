import React from "react";
import styles from "./borderedSection.module.css";

function BorderedSection({ title, children }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.headerBorderBefore}></div>
        {title && (
          <div className={styles.headerTitle}>
            {title && <span className={styles.title}>{title}</span>}
          </div>
        )}
        <div className={styles.headerBorderAfter}></div>
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
}

export default BorderedSection;
