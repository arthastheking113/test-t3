import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { CheckIfAdmin } from "~/utils/adminAuth";
import { User } from "@prisma/client";

const ManageUserRole: NextPage = () => {
  const { data: sessionData } = useSession();
  CheckIfAdmin(sessionData);
  const { data: allquery} = api.user.getAll.useQuery();
  return (
    <>
      <div className="bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <div className="flex flex-col justify-center gap-4 place-content-center min-h-screen">
              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full my-2 py-2 sm:px-6 lg:px-8">
                    <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded-full" href="/">
                      Home Page
                    </Link>
                    <h1 className="text-4xl text-white mt-3">Role Page</h1>
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                            <th scope="col" className="px-6 py-4">Name</th>
                            <th scope="col" className="px-6 py-4">Email</th>
                            <th scope="col" className="px-6 py-4">Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allquery?.map(function(item, i){
                            return (
                              <Row key={i} user={item}/>
                            )
                          })}
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>              
          </div>
      </div>
      
    </>
  );
};

export default ManageUserRole;

interface UserProps {
  user: User
}
type Option = {
  id: number,
  name: string,
  value: string
}
const options: Array<Option> = [{ id: 1, name: 'Admin', value: 'admin'},{ id: 2, name: 'Developer', value: 'developer'}]
const Row: React.FC<UserProps> = ({user}: UserProps) => {

  const onChange = (value: string) => {
    api.user.update.useQuery({ userId: user.id, role: value });
  };

  return (
    <tr className="border-b dark:border-neutral-500">
      <td className="whitespace-nowrap px-6 py-4 font-medium">{user.name}</td>
      <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <select
          onChange={(e) => onChange(e.target.value)}
          className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
          required={false}
        >
          {<option disabled selected={user.role == null || user.role == ""} value="">
              Choose a role
            </option>}

          {options.map((option) => (
            <option
              key={option.id || option.value}
              value={option.id || option.value}
              selected={user.role === option.value}
              disabled={user.role === "admin"}
            >
              {option.name}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
};