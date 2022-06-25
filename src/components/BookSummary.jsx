export function BookSummary(props) {
    return (
        <div>
            <h1>{props.name} </h1>
            <img src={props.image} />
            <div>
                <p>{props.author}</p>
            </div>
        </div>
    )
}