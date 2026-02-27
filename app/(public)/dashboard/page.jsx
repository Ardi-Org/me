// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import LogoutButton from "@/components/LogoutButton";

export default async function Dashboard() {
  // const session = await getServerSession();

  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <div>
      <h2>Dashboard</h2>
      {/* <p>Welcome {session.user.email}</p>
      <LogoutButton /> */}
    </div>
  );
}
