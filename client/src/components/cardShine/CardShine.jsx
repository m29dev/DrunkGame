import './cardShine.css'

// eslint-disable-next-line react/prop-types
const CardShine = ({ data }) => {
    return (
        <>
            <div className="contain">
                <div className="card">
                    <div className="shine"></div>
                    {/* Category */}
                    {/* <TextGradient text={category} size={45}></TextGradient> */}
                    {/* Assignment text */}
                    {/* {text} */}

                    <>{data}</>
                </div>
            </div>
        </>
    )
}

export default CardShine
