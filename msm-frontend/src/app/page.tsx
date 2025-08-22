import SchoolListPage from "./components/List/SchoolList";


export default async function Home() {
  return (
    <>
      <h1 className="text-black text-5xl text-center font-extrabold p-8">Welcome To Multi School Management System</h1>
      <SchoolListPage/>
    </>
  );
}
