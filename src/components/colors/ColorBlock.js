
export const ColorBlock = ({element}) => {
    return (
        <div className="color-block" style={{ backgroundColor: `${element.color}` }} key={ element.id }>
            <div className="color-block__year">
                { element.year }
            </div>
            <div className="color-block__container_name">
                <div className="color-block__color-name">{ element.name }</div>
                <div className="color-block__hexa">{ element.color }</div>
            </div>
            <div className="color-block__pantone">
                { element.pantone }
            </div>
        </div>
    );   
}