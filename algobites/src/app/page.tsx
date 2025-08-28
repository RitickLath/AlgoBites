import React from "react";
import Navbar from "./component/Navbar";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Navbar gap="medium" />

      <Link href="/notes">
        Notes
      </Link>
    </div>
  );
};

export default Home;
