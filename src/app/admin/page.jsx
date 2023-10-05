"use client";
import { useEffect, useState } from "react"
import AdminHomeView from "../../components/admin-view/home"
import AdminAboutView from "@/components/admin-view/about"
import AdminExperienceView from "@/components/admin-view/experience"
import AdminEducationView from "@/components/admin-view/education"
import AdminProjectView from "@/components/admin-view/project"
import AdminContactView from "@/components/admin-view/contact"
import { addData, getData, login, updateData } from "@/services";
import Login from "../../components/admin-view/login";


const initialHomeFormData = {
    heading: "",
    summary: ""
};
const initialAboutFormData = {
    aboutme: "",
    noofprojects: "",
    yearsofexperience: "",
    noofclients: "",
    skills: ""
};
const initialProjectFormData = {
    name: "",
    website: "",
    technologies: "",
    github: ""
};
const initialExperienceFormData = {
    position: "",
    company: "",
    duration: "",
    location: "",
    jobprofile: ""
};
const initialEducationFormData = {
    degree: "",
    year: "",
    college: ""
};
const initialLoginFormData = {
    username: "",
    password: ""
}


const AdminView = () => {

    const [currentSelectedTab, setCurrentSelectedTab] = useState("home");
    const [homeViewFormData, setHomeViewFormData] = useState(initialHomeFormData)
    const [aboutViewFormData, setAboutViewFormData] = useState(initialAboutFormData)
    const [experienceViewFormData, setExperienceViewFormData] = useState(initialExperienceFormData)
    const [educationViewFormData, setEducationViewFormData] = useState(initialEducationFormData)
    const [projectViewFormData, setProjectViewFormData] = useState(initialProjectFormData)
    const [allData, setAllData] = useState({})
    const [update, setUpdate] = useState(false)
    const [authUser, setAuthUser] = useState(false)
    const [loginFormData, setLoginFormData] = useState(initialLoginFormData)
    


    async function handleSavedData() {
        const dataMap = {
            home: homeViewFormData,
            about: aboutViewFormData,
            education: educationViewFormData,
            experience: experienceViewFormData,
            project: projectViewFormData
        }

        const response = update ? await updateData(currentSelectedTab, dataMap[currentSelectedTab]) : await addData(currentSelectedTab, dataMap[currentSelectedTab]);
        console.log("response--", response);

        if (response.success) {
            resetFormData()
            extractAllData()
        }
    }

    async function extractAllData() {
        const response = await getData(currentSelectedTab);

        if (currentSelectedTab === "home" && response && response.data && response.data.length) {
            setHomeViewFormData(response && response.data[0]);
            setUpdate(true)
        }


        if (currentSelectedTab === "about" && response && response.data && response.data.length) {
            setAboutViewFormData(response && response.data[0])
            setUpdate(true)
        }

        if (response?.success) {
            setAllData({
                ...allData,
                [currentSelectedTab]: response && response.data
            })
        }
    }

    const resetFormData = () => {
        setHomeViewFormData(initialHomeFormData);
        setAboutViewFormData(initialAboutFormData);
        setEducationViewFormData(initialEducationFormData);
        setExperienceViewFormData(initialExperienceFormData);
        setProjectViewFormData(initialProjectFormData)
    }


    const menuItems = [
        {
            id: "home",
            label: "Home",
            component: <AdminHomeView data={allData?.home} formData={homeViewFormData} setFormData={setHomeViewFormData} handleSavedData={handleSavedData} />
        },
        {
            id: "about",
            label: "About",
            component: <AdminAboutView data={allData?.about} formData={aboutViewFormData} setFormData={setAboutViewFormData} handleSavedData={handleSavedData} />
        },
        {
            id: "experience",
            label: "Experience",
            component: <AdminExperienceView data={allData?.experience} formData={experienceViewFormData} setFormData={setExperienceViewFormData} handleSavedData={handleSavedData} />
        },
        {
            id: "education",
            label: "Education",
            component: <AdminEducationView data={allData?.education} formData={educationViewFormData} setFormData={setEducationViewFormData} handleSavedData={handleSavedData} />
        },
        {
            id: "project",
            label: "Project",
            component: <AdminProjectView data={allData?.project} formData={projectViewFormData} setFormData={setProjectViewFormData} handleSavedData={handleSavedData} />
        },
        {
            id: "contact",
            label: "Contact",
            component: <AdminContactView 
            data={allData && allData.contact}
            />
            
        }

    ];

    const handleLogin = async () => {
        const res = await login(loginFormData);
        console.log(res,"res..");

        if (res?.success) {
            setAuthUser(true);
            sessionStorage.setItem("authUser", JSON.stringify(true))
        }
    }

    useEffect(()=>{
        setAuthUser(JSON.parse(sessionStorage.getItem("authUser")))
    },[])



    useEffect(() => {
        extractAllData()
    }, [currentSelectedTab])

    if (!authUser) {
        return <Login handleLogin={handleLogin} formData={loginFormData} setFormData={setLoginFormData} />
    }

    return (
        <div className="border-b border-gray-200">
            <nav className="mb-0.5 flex justify-center space-x-6" role="tablist">
                {
                    menuItems.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className="p-4 font-bold text-xl text-black"
                            onClick={() => {
                                setCurrentSelectedTab(item.id)
                                resetFormData()
                                setUpdate(false)

                            }}
                        >
                            {item.label}
                        </button>
                    ))
                }
                <button onClick={()=>{
                    setAuthUser(false)
                    sessionStorage.removeItem("authUser")
                }} className="p-4 font-bold text-xl text-black">Logout</button>
            </nav>
            <div className="mt-10 p-10">
                {
                    menuItems.map((item) => item.id === currentSelectedTab &&
                        <div key={item.id}>{item.component}</div>
                    )
                }
            </div>
        </div>
    )
}

export default AdminView