// src/app/page.tsx

import ParentList from "./components/cards/ParentList";
import SchoolList from "./components/cards/SchoolList";
import SuperAdminList from "./components/cards/SuperAdminList";
import CreateParent from "./components/newEntity/CreateParent";
import CreateSchool from "./components/newEntity/CreateSchool";
import CreateStudent from "./components/newEntity/CreateStudent";
import CreateSuperAdmin from "./components/newEntity/CreateSuperAdmin";

export default async function Home() {
  return (
    <>
      <h1 className="text-black text-5xl text-center font-extrabold p-8">TEST PAGE CREATE</h1>
      <CreateSuperAdmin />
      <CreateSchool />
      <CreateStudent/>
      <CreateParent/>
      <h1 className="text-black text-5xl text-center font-extrabold p-8">TEST PAGE LIST</h1>
      <SuperAdminList />
      <SchoolList />
      <SchoolList/>
      <ParentList/>
    </>
  );
}
