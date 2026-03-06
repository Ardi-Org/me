"use client";

import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data, error } = useSWR("/api/stats", fetcher, {
    refreshInterval: 60000,
  });

  const [filter, setFilter] = useState(null);

  if (error) return <p>Error loading</p>;
  if (!data) return <p>Loading...</p>;

  const stats = data.stats;
  const rows = data.data;

  const filtered = rows.filter((item) => {
    const tab = (item.tab_update || "").toLowerCase();
    const kol = item.kol_update || "";

    if (filter === "berhasil_post")
      return tab.includes("post") && kol.includes('"status":"sukses"');

    if (filter === "gagal_post")
      return tab.includes("post") && kol.includes('"status":"gagal"');

    if (filter === "berhasil_get")
      return tab.includes("get") && kol.includes('"status":"sukses"');

    if (filter === "gagal_get")
      return tab.includes("get") && kol.includes('"status":"gagal"');

    return false;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>SIASN BKN Integration Monitor</h1>

      {/* STATS */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <div
          onClick={() => setFilter("berhasil_post")}
          style={{ cursor: "pointer" }}
        >
          <h3>Berhasil Post</h3>
          <h1>{stats.berhasil_post}</h1>
        </div>

        <div
          onClick={() => setFilter("gagal_post")}
          style={{ cursor: "pointer" }}
        >
          <h3>Gagal Post</h3>
          <h1>{stats.gagal_post}</h1>
        </div>

        <div
          onClick={() => setFilter("berhasil_get")}
          style={{ cursor: "pointer" }}
        >
          <h3>Berhasil Get</h3>
          <h1>{stats.berhasil_get}</h1>
        </div>

        <div
          onClick={() => setFilter("gagal_get")}
          style={{ cursor: "pointer" }}
        >
          <h3>Gagal Get</h3>
          <h1>{stats.gagal_get}</h1>
        </div>
      </div>

      {/* DETAIL TABLE */}
      {filter && (
        <>
          <h3>Detail ({filter.replace("_", " ")})</h3>

          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>NIP</th>
                <th>Nama</th>
                <th>Aktivitas</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((row, i) => (
                <tr key={i}>
                  <td>{row.tgl_update}</td>
                  <td>{row.data_update}</td>
                  <td>{row.nama_update}</td>
                  <td>{row.tab_update}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
