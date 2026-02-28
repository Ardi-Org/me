import styles from "@/app/page.module.css";
import PopupMenu from "@/components/PopupMenu";

export default function Bottom_navbar() {
  return (
    <div className={styles.bottom_navbar}>
      <div className={styles.footer}>
        <a href="/" rel="noopener noreferrer">
          <svg
            className={styles.logo}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={22}
            height={22}
            color={"#000000"}
            fill={"none"}
          >
            <path
              d="M7.08848 4.76364L6.08847 5.54453C4.57182 6.72887 3.81348 7.32105 3.40674 8.15601C3 8.99097 3 9.95552 3 11.8846V13.9767C3 17.763 3 19.6562 4.17157 20.8325C5.11466 21.7793 6.52043 21.964 9 22V18.0057C9 17.0738 9 16.6078 9.15224 16.2403C9.35523 15.7502 9.74458 15.3609 10.2346 15.1579C10.6022 15.0057 11.0681 15.0057 12 15.0057C12.9319 15.0057 13.3978 15.0057 13.7654 15.1579C14.2554 15.3609 14.6448 15.7502 14.8478 16.2403C15 16.6078 15 17.0738 15 18.0057V22C17.4796 21.964 18.8853 21.7793 19.8284 20.8325C21 19.6562 21 17.763 21 13.9767V11.8846C21 9.95552 21 8.99097 20.5933 8.15601C20.1865 7.32105 19.4282 6.72887 17.9115 5.54453L16.9115 4.76364C14.5521 2.92121 13.3724 2 12 2C10.6276 2 9.44787 2.92121 7.08848 4.76364Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          Home
        </a>
        {/* <a href="/json" rel="noopener noreferrer">
          <svg
            className={styles.logo}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={22}
            height={22}
            color={"#000000"}
            fill={"none"}
          >
            <path
              d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M6 13.5L7.5 9L9.375 13.5M6 13.5L5.5 15M6 13.5H9.375M9.375 13.5L10 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5 12V9.7C12.5 9.51387 12.5 9.42081 12.5245 9.34549C12.5739 9.19327 12.6933 9.07393 12.8455 9.02447C12.9208 9 13.0139 9 13.2 9H14.5C15.3284 9 16 9.67157 16 10.5C16 11.3284 15.3284 12 14.5 12H12.5ZM12.5 12V15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.5 9V15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Json
        </a> */}
        <a href="/today" rel="noopener noreferrer">
          <svg
            className={styles.logo}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={22}
            height={22}
            color={"#000000"}
            fill={"none"}
          >
            <path
              d="M8.88231 3.32966C10.4038 2.44322 11.1646 2 12 2C12.8354 2 13.5962 2.44322 15.1177 3.32966L17.8823 4.94031C19.4038 5.82675 20.1646 6.26997 20.5823 7C21 7.73003 21 8.61647 21 10.3894V13.6106C21 15.3835 21 16.27 20.5823 17C20.1646 17.73 19.4038 18.1733 17.8823 19.0597L15.1177 20.6703C13.5962 21.5568 12.8354 22 12 22C11.1646 22 10.4038 21.5568 8.88231 20.6703L6.11769 19.0597C4.59615 18.1733 3.83538 17.73 3.41769 17C3 16.27 3 15.3835 3 13.6106V10.3894C3 8.61647 3 7.73003 3.41769 7C3.83538 6.26997 4.59615 5.82675 6.11769 4.94031L8.88231 3.32966Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
          Today
        </a>

        <PopupMenu />
      </div>
    </div>
  );
}
