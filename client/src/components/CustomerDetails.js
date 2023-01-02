import style from "../styles/booking.module.css";

export const CustomerDetails = ({ handleStep }) => {
    return (<div className={style.outer}>
        <div className={style.Customer}>

        </div>
        <div className={style.buttons}>
            <button
                onClick={() => {
                    handleStep("DateTime");
                }}
                className={style.backBtn}
            >
                Back
            </button>
            <button
                className={style.nextBtn}
                onClick={() => {
                    handleStep("Confirm");
                }}
            >
                Next
            </button>
        </div>
    </div>);
}