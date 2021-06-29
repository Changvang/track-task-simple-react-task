import { useState } from "react";
import { Button } from "./Button";
import PropTypes from "prop-types";
import Add from "./Add";
import { useLocation } from "react-router-dom";

function Header({ title, addTask }) {
    const location = useLocation();
    const [clickAdd, setclickAdd] = useState(true);
    const onClickAddButton = () => {
        setclickAdd(!clickAdd);
    };
    return (
        <>
            <div className='header'>
                <h1>{title}</h1>
                {location.pathname === "/" && (
                    <Button
                        color={clickAdd ? "green" : "red"}
                        text={clickAdd ? "Add" : "Close"}
                        onClick={onClickAddButton}
                    />
                )}
            </div>
            {!clickAdd && <Add onAddTask={addTask} />}
        </>
    );
}

Header.defaultProps = {
    title: "Task Tracker",
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
