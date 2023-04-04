// pages/403.tsx
import { NextPage } from "next";
const Custom403: NextPage = () => {
  return (
    <div className="container">
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="my-4 text-center">
            <h1 className="text-2xl">403 - Unauthorized</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom403;