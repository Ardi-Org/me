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

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch holidays");

  return res.json();
}

export default async function HolidaysPage() {
  const { hari, tanggal, bulan, bulanAngka, tahun } = getTanggalIndonesia();

  const holidays = await getHolidays(bulanAngka, tahun);
  const todayISO = getTodayISO();

  const todayEvents = holidays.filter((item) => item.event_date === todayISO);

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
      {todayEvents.length > 0 ? (
        <div className={styles.today_even_wrap}>
          <div className={styles.today_even}>
            <ul>
              {todayEvents.map((event, index) => (
                <li key={index} style={{ marginBottom: 8 }}>
                  <strong>{event.event_name}</strong>
                  <br />
                  Libur : {event.is_national_holiday ? "Ya" : "Tidak"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Nama Event</th>
            <th>Libur</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((item, index) => (
            <tr className={styles.json} key={index}>
              <td className={styles.fieldJson}>{item.event_date}</td>
              <td className={styles.fieldJson}>{item.event_name}</td>
              <td className={styles.fieldJson}>
                {item.is_national_holiday ? "Ya" : "Tidak"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
