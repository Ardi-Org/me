import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// import { Agent } from "undici";

// const insecureDispatcher = new Agent({
//   connect: {
//     rejectUnauthorized: false, // ⚠️ TEMP: expired SSL
//   },
// });

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const dataRes = await fetch("https://api.ardilas.com/public/bkn/event", {
      method: "GET",
      headers: {
        "X-Proxy-Key": process.env.PROXY_SECRET,
      },
    });
    // console.log("dataRes:", dataRes);

    // const data = await dataRes.json();
    const apiResult = await dataRes.json();

    if (!dataRes.ok) {
      throw new Error("Event API request failed");
    }

    // console.log("TOTAL DATA:", apiResult.data?.length);
    const stats = {
      berhasil_post: 0,
      gagal_post: 0,
      berhasil_get: 0,
      gagal_get: 0,
    };

    for (const item of apiResult.data || []) {
      const tab = (item.tab_update || "").toLowerCase();
      const kol = item.kol_update || "";

      if (tab.includes("post") && kol.includes('"status":"sukses"'))
        stats.berhasil_post++;
      if (tab.includes("post") && kol.includes('"status":"gagal"'))
        stats.gagal_post++;
      if (tab.includes("get") && kol.includes('"status":"sukses"'))
        stats.berhasil_get++;
      if (tab.includes("get") && kol.includes('"status":"gagal"'))
        stats.gagal_get++;
    }

    return NextResponse.json({
      stats,
      data: apiResult.data || [],
    });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch BKN data",
        message: err.message,
      },
      { status: 500 },
    );
  }
}
