import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface NavBtnProps {
  text: string;
  handleNavigation: () => void; // Adjust the type of handleNavigation as per your requirement
}

const NavBtn: React.FC<NavBtnProps> = ({ text, handleNavigation }) => {
  // const [userLogin, setUserLogin] = useState<boolean>(false);
  const { data: session } = useSession();

  /* useEffect(() => {
    const checkLoginStatus = async () => {
      setUserLogin(loggedIn);
    };
    checkLoginStatus();
  }, []);
 */
  const handleClick = async () => {
    if (session) {
      handleNavigation();
    } else {
      alert("Please login to use features");
    }
  };

  return (
    <button
      className="text-base font-bold hover:text-mainBlue"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default NavBtn;
