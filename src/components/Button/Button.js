import './Button.css';

const Button = ({ className, value, onClickHandler }) => {
    return (
        <div className="button-container">
            <input className={className} type="submit" value={value} onClick={onClickHandler} />
        </div>
    );
}

export default Button;