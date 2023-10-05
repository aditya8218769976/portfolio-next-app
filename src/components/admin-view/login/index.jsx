"use client"

import FormControls from "../form-controls"

const Login = ({formData, setFormData, handleLogin}) => {

    const controls = [
        {
            name:"username",
            placeholder: "Enter User Name",
            type:"text",
            label:"Enter User Name"
        },
        {
            name:"password",
            placeholder: "Enter Your Password",
            type:"password",
            label:"Enter Your Password"
        }
    ]



    return (
        <div className="w-full">
           <div className="bg-[#ffffff] shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <FormControls 
              controls={controls}
              formData={formData}
              setFormData={setFormData}
            />
            <button onClick={handleLogin} className="border border-green-600 p-4 font-bold text-[16px mt-[10px]">Login</button>
           </div>
        </div>
      )
}

export default Login