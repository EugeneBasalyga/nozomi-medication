import './Input.css';

const Input = ({ label, type, required, onChangeHandler }) => {
    return (
        <div className="input-container">
            <label>{label}</label>
            <input type={type} required={required} onChange={onChangeHandler} />
        </div>
    );
}

export default Input;