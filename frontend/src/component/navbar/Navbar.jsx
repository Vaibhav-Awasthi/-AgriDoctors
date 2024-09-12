import React from "react";
import Container from "../container/Container";
import farmericon from "../../assets/farmer.png";
const Navbar = () => {
  return (
    <div className="bg-[var(--secondary-color)] p-4 w-full">
      <Container>
        <div className="flex flex-row items-center gap-1 justify-center">
          <img className="h-10 w-10" src={farmericon} alt="" />
          <h2 className="text-white font-bold text-xl">AgriDOCTOR</h2>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
