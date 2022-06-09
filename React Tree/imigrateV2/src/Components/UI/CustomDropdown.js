const CustomDropdown = (props) => {

    const Options = (props) => {
        return (
            <option>{props.item}</option>
        )
    }

    return (
        <div className="dropdown-menu d-block position-static p-0 pt-1 mt-4">
            <h6 className="dropdown-header pt-0 pb-0 pl-1 left">{props.name}</h6>
            <select className="dropdown-item small fw-bold px-2" ref={props.save}>
                {props.items.map(item=><Options key={item} item={item} />)}
            </select>
        </div>
    )
}

export default CustomDropdown