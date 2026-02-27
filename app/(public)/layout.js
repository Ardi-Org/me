import Top_navbar from "@/components/top_navbar";
import Bottom_navbar from "@/components/bottom_navbar";
import SessionWatcher from "@/components/SessionWatcher";

export default async function ProtectedLayout({ children }) {
  // const session = await getServerSession();

  // if (!session) {
  //   redirect("/login");
  // }

  // return children;
  return (
    <>
      {/* <SessionWatcher /> */}
      <Top_navbar />
      <main className="content">{children}</main>
      <Bottom_navbar />
    </>
  );
}
