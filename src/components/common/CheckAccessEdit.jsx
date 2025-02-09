import React from 'react'
import { useSelector } from 'react-redux';

const CheckAccessEdit = ({edit_access, children}) => {
    const accessEdit = useSelector((state) => state.auth.user?.edit_access_name).split(",");
    // console.log(accessEdit);
  return (
    <>
    {
        accessEdit.includes(edit_access) && (
            <div>
                {children}
            </div>
        )
    }
    </>
  )
}

export default CheckAccessEdit
