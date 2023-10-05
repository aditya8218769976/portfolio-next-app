"use client"

import FormControls from "../form-controls"


const AdminHomeView = ({formData, setFormData, handleSavedData}) => {
    console.log(formData);
    const controls = [
        {
            name:"heading",
            placeholder: "Enter heading text",
            type:"text",
            label:"Enter heading text"
        },
        {
            name:"summary",
            placeholder: "Enter Career summary",
            type:"text",
            label:"Enter Career summary"
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
        <button onClick={()=> handleSavedData("home")} className="border border-green-600 p-4 font-bold text-[16px mt-[10px]">Add info</button>
       </div>
    </div>
  )
}

export default AdminHomeView