import React from 'react'

const FormSubmitLoader = ({ loading_msg }) => {
    return (
        <>
            <div className="form-loader fixed flex items-center justify-center h-screen z-50 inset-0 w-screen bg-[#000000c5]">
                <div className="loader-box text-center">
                    <span className="loader1"></span>
                    <p className='text-white mt-5'>{loading_msg}</p>
                </div>
            </div>

        </>
    )
}

export default FormSubmitLoader
