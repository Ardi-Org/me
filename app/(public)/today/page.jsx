import styles from "@/app/page.module.css";

export const dynamic = "force-dynamic";

function getTanggalIndonesia() {
  const now = new Date();

  const formatter = (options) =>
    new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      ...options,
    }).format(now);

  return {
    hari: formatter({ weekday: "long" }),
    tanggal: formatter({ day: "2-digit" }),
    bulan: formatter({ month: "long" }),
    bulanAngka: formatter({ month: "numeric" }),
    tahun: formatter({ year: "numeric" }),
  };
}

function getTodayISO() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date()); // hasil: YYYY-MM-DD
}

async function getHolidays(month, year) {
  const url = `https://hari-libur-api.vercel.app/api?month=${month}&year=${year}`;

  const res = await fetch(url, { cache: "no-store" }).catch(() => null);

  if (!res || !res.ok) return false;

  return res.json();
}

async function getHolidays2(month, year) {
  const url = `https://libur.deno.dev/api?month=${month}&year=${year}`;

  const res = await fetch(url, { cache: "no-store" }).catch(() => null);

  if (!res || !res.ok) return false;

  return res.json();
}

export default async function HolidaysPage() {
  const { hari, tanggal, bulan, bulanAngka, tahun } = getTanggalIndonesia();

  const todayISO = getTodayISO();

  let holidays = await getHolidays(bulanAngka, tahun);
  let holidays2 = null;
  let useSecondApi = false;

  if (!holidays) {
    holidays2 = await getHolidays2(bulanAngka, tahun);
    useSecondApi = true;
  }

  const todayEvents = useSecondApi
    ? holidays2?.filter((item) => item.date === todayISO) || []
    : holidays?.filter((item) => item.event_date === todayISO) || [];

  return (
    <div style={{ padding: 24 }}>
      <div className={styles.today_main}>
        <div className={styles.today_tanggal}>{tanggal}</div>
        <div>
          <div>{hari}</div>
          <div>
            {bulan} {tahun}
          </div>
        </div>
      </div>

      {/* ✅ EVENT HARI INI */}
      {todayEvents.length > 0 && (
        <div className={styles.today_even_wrap}>
          <div className={styles.today_even}>
            <ul>
              {todayEvents.map((event, index) => (
                <li key={index} style={{ marginBottom: 8 }}>
                  <div className={styles.today_even_name}>
                    {useSecondApi ? event.name : event.event_name}
                  </div>
                  <div className={styles.today_even_svg}>
                    {event.is_national_holiday ? (
                      <svg
                        className={styles.svg_libur}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={16}
                        height={16}
                        color={"#000000"}
                        fill={"none"}
                      >
                        <path
                          d="M15 6.5H9C6.17157 6.5 4.75736 6.5 3.87868 7.37868C3 8.25736 3 9.67157 3 12.5V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V12.5C21 9.67157 21 8.25736 20.1213 7.37868C19.2426 6.5 17.8284 6.5 15 6.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M9 6.5V6C9 4.58579 9 3.87868 9.43934 3.43934C9.87868 3 10.5858 3 12 3C13.4142 3 14.1213 3 14.5607 3.43934C15 3.87868 15 4.58579 15 6V6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M21 10.5C18.7909 10.5 17 8.70914 17 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M9.25 12L8.5 12.75L9.25 13.5L10 12.75L9.25 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M3 17C5.20914 17 7 18.7909 7 21"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M3 10.5C5.20914 10.5 7 8.70914 7 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M21 17C18.7909 17 17 18.7909 17 21"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M14 16.8L12.5 16.5L13.7 15.3L14 16.8Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M14.5 11V11.01"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className={styles.svg_kerja}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={38}
                        height={38}
                        color={"#000000"}
                        fill={"none"}
                      >
                        {" "}
                        {/*https://hugeicons.com/icon/briefcase-06?style=stroke-rounded */}
                        <path
                          d="M8.5 6.5C8.5 5.09554 8.5 4.39331 8.83706 3.88886C8.98298 3.67048 9.17048 3.48298 9.38886 3.33706C9.89331 3 10.5955 3 12 3C13.4045 3 14.1067 3 14.6111 3.33706C14.8295 3.48298 15.017 3.67048 15.1629 3.88886C15.5 4.39331 15.5 5.09554 15.5 6.5"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M22 14V13.5C22 10.2002 22 8.55025 20.9749 7.52513C19.9497 6.5 18.2998 6.5 15 6.5H9C5.70017 6.5 4.05025 6.5 3.02513 7.52513C2 8.55025 2 10.2002 2 13.5V14C2 17.2998 2 18.9497 3.02513 19.9749C4.05025 21 5.70017 21 9 21H15C18.2998 21 19.9497 21 20.9749 19.9749C22 18.9497 22 17.2998 22 14Z"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M2 11C2 11 4.63158 15 12 15C19.3684 15 22 11 22 11"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M12 12H12.009"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Nama Event</th>
            {!useSecondApi && <th>Libur</th>}
          </tr>
        </thead>
        <tbody>
          {(useSecondApi ? holidays2 : holidays)?.map((item, index) => (
            <tr className={styles.json} key={index}>
              <td className={styles.fieldJson}>
                {useSecondApi ? item.date : item.event_date}
              </td>
              <td className={styles.fieldJson}>
                {useSecondApi ? item.name : item.event_name}
              </td>
              {!useSecondApi && (
                <td className={styles.fieldJson}>
                  {item.is_national_holiday ? (
                    <svg
                      className={styles.svg_iya}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={16}
                      height={16}
                      color={"#000000"}
                      fill={"none"}
                    >
                      <path
                        d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className={styles.svg_tidak}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={16}
                      height={16}
                      color={"#000000"}
                      fill={"none"}
                    >
                      <path
                        d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085"
                        stroke="#000000"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
