import { createContext, useState } from "react";
import { loadAuthSession } from "../utils/authStorage";

export const SubjectContext = createContext(null);

const SubjectContextProvider = ({ children }) => {
  const authSession = loadAuthSession();
  const [departmentscontext, setDepartmentscontext] = useState('');
  const [videoFiles, setVideoFiles] = useState([]);
  const [admindept, setAdmindept] = useState('');
  const [currentadmin, setCurrentadmin] = useState(authSession.admin || null);
  const [currentuser,setCurrentuser] = useState(authSession.user || null);
  return (
    <SubjectContext.Provider
      value={{ departmentscontext, setDepartmentscontext, videoFiles, setVideoFiles, admindept, setAdmindept, currentadmin, setCurrentadmin,currentuser,setCurrentuser }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectContextProvider;
