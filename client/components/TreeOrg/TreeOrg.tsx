import { useEffect } from "react";

const TreeOrg = () => {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/children/`);
  }, []);

  return <span>Tree Or</span>;
};

export default TreeOrg;