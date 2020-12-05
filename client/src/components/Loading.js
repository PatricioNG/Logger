import loader from '../assets/loading/loader.svg';

export const Loading = () => {
    return (
        <div className="loading">
            <img src={loader} alt="Loading icon" className="loading__icon" />
            <h1 className="loading__text">We're getting things ready for you.</h1>
        </div >
    )
}