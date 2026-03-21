// Para textos pequenos

export default function InputText({ label, data, setData, property, isANewDoc, disabled }) {
    const handleChangeItem = (id, property, value) => {
        if (!isANewDoc) {
            setData((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, [property]: value }
                        : item
                )
            );
        } else {
            setData({ ...data, [property]: value });
        }
    };

    return <div className="mb-3" >
        <label>{label}:</label>
        <input
            type="text"
            className="form-control"
            value={data[property]}
            disabled={disabled}
            onChange={(e) => {
                handleChangeItem(data.id, property, e.target.value);
            }}
        />
    </div >;
}