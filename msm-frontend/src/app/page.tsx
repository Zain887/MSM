// src/app/page.tsx

import SchoolList from "./components/cards/SchoolList";
import SuperAdminList from "./components/cards/SuperAdminList";
import CreateSchool from "./components/newEntity/CreateSchool";
import CreateSuperAdmin from "./components/newEntity/CreateSuperAdmin";

export default async function Home() {
  return (
    <>
      <h1 className="text-black text-5xl text-center font-extrabold p-8">TEST PAGE CREATE</h1>
      <CreateSuperAdmin />
      <CreateSchool />
      <h1 className="text-black text-5xl text-center font-extrabold p-8">TEST PAGE LIST</h1>
      <SuperAdminList />
      <SchoolList />
    </>
  );
}
