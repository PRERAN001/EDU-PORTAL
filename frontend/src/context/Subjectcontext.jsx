import { createContext, useState } from "react";

export const SubjectContext = createContext(null);

const SubjectContextProvider = ({ children }) => {
  const [departmentscontext, setDepartmentscontext] = useState('');
  const [videoFiles, setVideoFiles] = useState([]);
  const [admindept, setAdmindept] = useState('');
  const [currentadmin, setCurrentadmin] = useState('');
  const [currentuser,setCurrentuser] = useState('');
  return (
    <SubjectContext.Provider
      value={{ departmentscontext, setDepartmentscontext, videoFiles, setVideoFiles, admindept, setAdmindept, currentadmin, setCurrentadmin,currentuser,setCurrentuser }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectContextProvider;
