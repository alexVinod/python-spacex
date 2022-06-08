import { useRef, useState } from "react"
import CustomDropdown from "./UI/CustomDropdown"
import LoadingSpinner from "./UI/LoadingSpinner"

const Left = () => {

    const selectedOrganization = useRef('')
    const selectedSpace = useRef('')

    const [loading, setLoading] = useState(false)
    const [applicationsList, setApplicationsList] = useState(null)

    const getAppsHandler = () => {
        console.log(selectedOrganization.current.value, selectedSpace.current.value)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, [2000])

        // var exec1 = require("child_process").exec;
        // exec1("ls -a", function (a, b, c) {
        //     // console.log("error", a)
        //     // console.log("output", b)
        //     // console.log("stderror:", c)
        // })

        // to be fetched from api
        const data = ['imigrate', 'spring-music'];
        setApplicationsList(data)
    }


    const Options = (props) => {
        console.log(props.item)
        return (
            <option>{props.item}</option>
        )
    }

    return (
        <div className="left">
            <CustomDropdown
                name='Select Organization'
                items={['ramki.veda@gmail.com', 'Organization 2', 'Organization 3', 'Organization 4', 'Organization 5']}
                save={selectedOrganization}
            />

            <CustomDropdown
                name='Select Space'
                items={['dev', 'qa', 'uat', 'prd']}
                save={selectedSpace}
            />

            <div className="buttonsDiv">
                <button className="getAppsButtons btn btn-navy text-gold " onClick={getAppsHandler}>Get Apps</button>
            </div>


            <div className={`dropdown-menu d-block position-static p-0 pt-1 mt-4 ${applicationsList === null && `notAllowed`}`}>
                <h6 className="dropdown-header pt-0 pb-0 pl-0">
                    {!loading && 'List of Applications'}
                    {loading && <div className="loadingSpinnerContainer"><LoadingSpinner /></div>}
                </h6>
                <select className="dropdown-item small fw-bold px-2" disabled={applicationsList === null}>
                    {!loading && applicationsList && applicationsList.map(item =>
                        <Options key={Math.random()} item={item} />
                    )}
                </select>
            </div>

        </div>
    )
}

export default Left